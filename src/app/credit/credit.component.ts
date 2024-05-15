import { CreditService } from './../credit.service';
import { CreditRequestService } from './../credit-request.service';
import { CreditRequest } from './../credit-request.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ModalDismissReasons, NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  entityForm: FormGroup | undefined;
  creditRequests: CreditRequest[] = [];
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  model : NgbDate;

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  constructor(private fb: FormBuilder, private cs :CreditService , private crs :CreditRequestService,private modalService: NgbModal, calendar: NgbCalendar,private router: Router) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);
  }
  open(content, type, modalDimension) {
    if (modalDimension === 'sm' && type === 'modal_mini') {
        this.modalService.open(content, { windowClass: 'modal-mini', size: 'sm', centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    } else if (modalDimension === '' && type === 'Notification') {
      this.modalService.open(content, { windowClass: 'modal-danger', centered: true }).result.then((result) => {
          this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    } else {
        this.modalService.open(content,{ centered: true }).result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
    }
}

private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
        return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
        return 'by clicking on a backdrop';
    } else {
        return  `with: ${reason}`;
    }
}
isRangeStart(date: NgbDate){
  return this.model1 && this.model2 && date.equals(this.model1);
}
isRangeEnd(date: NgbDate){
  return this.model1 && this.model2 && date.equals(this.model2);
}
isInRange(date: NgbDate){
  return date.after(this.model1) && date.before(this.model2);
}
isActive(date: NgbDate){
  return date.equals(this.model1) || date.equals(this.model2);
}
endDateChanged(date){
  if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
    this.model1 = this.model2;
  }
}
startDateChanged(date){
  if (this.model1 && this.model2 && (this.model1.year > this.model2.year || this.model1.year === this.model2.year && this.model1.month > this.model2.month || this.model1.year === this.model2.year && this.model1.month === this.model2.month && this.model1.day > this.model2.day )) {
    this.model2 = this.model1;
  }
}
  ngOnInit(): void {
    this.entityForm = this.fb.group({
      deadline: ['', Validators.required],
      startDate: ['', Validators.required],
      autoFinance: ['', Validators.required],
      creditRequest: [null, Validators.required] // Add a control for credit request

    });

    this.crs.getAllCreditRequests().subscribe(creditRequests => {
      this.creditRequests = creditRequests;
 
    });
  }
  toDateF( dateObject) {
    const { year, month, day } = dateObject;
  
  
    return new Date(year, month - 1, day);
  }
  onSubmit() {
    if (this.entityForm?.valid) {
      console.log("object");
      const requestData = {
        ...this.entityForm.value,
        creditRequest: this.creditRequests.find(request=>request.id==this.entityForm.value.creditRequest),
        startDate: this.toDateF(this.entityForm.value.startDate),
        deadline: this.toDateF(this.entityForm.value.deadline)};
        
      this.cs.addCredit(requestData).subscribe(data=>{
        console.log(data);
      });  
      this.router.navigate(['/credits']);
    } else {
      // Form validation failed, do something
    }
  }


}

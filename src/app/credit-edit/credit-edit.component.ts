import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreditRequest } from '../credit-request.model';
import { CreditService } from '../credit.service';
import { CreditRequestService } from '../credit-request.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-credit-edit',
  templateUrl: './credit-edit.component.html',
  styleUrls: ['./credit-edit.component.css']
})
export class CreditEditComponent implements OnInit {

  entityForm: FormGroup | undefined;
  creditRequests: CreditRequest[] = [];
  fromDate: NgbDate;
  toDate: NgbDate;
  hoveredDate: NgbDate;
  closeResult: string;
  model1 : NgbDate;
  model2 : NgbDate;
  model : NgbDate;
  currentId: number;

  focus;
  focus1;
  focus2;
  focus3;
  focus4;
  constructor(private route: ActivatedRoute,private fb: FormBuilder, private cs :CreditService , private crs :CreditRequestService,private modalService: NgbModal, calendar: NgbCalendar) {
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
    this.route.params.subscribe(params => {
      this.currentId = params['id']; // Access the 'id' parameter from the URL
      console.log('Test ID:', this.currentId);
    });
    this.crs.getAllCreditRequests().subscribe(creditRequests => {
      this.creditRequests = creditRequests;
 
    });
    this.cs.getCredit(this.currentId).subscribe((credit)=>{
      this.entityForm = this.fb.group({
        deadline: [this.fromDateO(credit.deadline), Validators.required],
        startDate: [this.fromDateO(credit.startDate), Validators.required],
        autoFinance: [credit.autoFinance, Validators.required],
        creditRequest: [credit.CreditRequest, Validators.required] 
  
      });
    })
    console.log(this.entityForm.value);



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
        deadline: this.toDateF(this.entityForm.value.deadline),
        idCredit: this.currentId};
        
      this.cs.updateCredit(requestData).subscribe(data=>{
        console.log(data);
      });  
    } else {    }
  }
   fromDateO(t) {
    // Create a new Date object using the provided string
    const date = new Date(t);
  
    // Extract year, month, and day from the Date object
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // Adding 1 to match the 1-based month index
    const day = date.getDate();
  
    // Return an object containing the extracted properties
    return { year, month, day };
  }

  // Custom validator for interestRate
  interestRateValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 0 || value > 100) {
      return { invalidInterestRate: true };
    }
    return null;
  }

}

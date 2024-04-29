import { CreditService } from './../credit.service';
import { CreditRequestService } from './../credit-request.service';
import { CreditRequest } from './../credit-request.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-credit',
  templateUrl: './credit.component.html',
  styleUrls: ['./credit.component.css']
})
export class CreditComponent implements OnInit {
  entityForm: FormGroup | undefined;
  creditRequests: CreditRequest[] = [];

  constructor(private fb: FormBuilder, private cs :CreditService , private crs :CreditRequestService) { }

  ngOnInit(): void {
    this.entityForm = this.fb.group({
      deadline: ['', Validators.required],
      interestRate: ['', [Validators.required, Validators.min(0), Validators.max(100)]],
      startDate: ['', Validators.required],
      autoFinance: ['', Validators.required],
      totalAmount: ['', Validators.required],
      creditRequest: [null, Validators.required] // Add a control for credit request

    });

    this.crs.getAllCreditRequests().subscribe(creditRequests => {
      this.creditRequests = creditRequests;
 
    });
  }

  onSubmit() {
    if (this.entityForm?.valid) {
      console.log("object");
      const requestData = {
        ...this.entityForm.value,
        creditRequest: this.creditRequests.find(request=>request.id==this.entityForm.value.creditRequest) };
      this.cs.addCredit(requestData).subscribe(data=>{
        console.log(data);
      });  
    } else {
      // Form validation failed, do something
    }
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

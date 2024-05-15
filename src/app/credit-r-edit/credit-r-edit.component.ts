import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { CreditRequest } from '../credit-request.model';
import { CreditRequestService } from '../credit-request.service';

@Component({
  selector: 'app-credit-r-edit',
  templateUrl: './credit-r-edit.component.html',
  styleUrls: ['./credit-r-edit.component.css']
})
export class CreditREditComponent implements OnInit {
  entityForm: FormGroup | undefined;
  creditRequestId: number;
  creditRequest: CreditRequest | undefined;

  constructor(
    private fb: FormBuilder, 
    private creditRequestService: CreditRequestService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Fetch the credit request data based on the ID from the route parameters
    this.route.params.subscribe(params => {
      this.creditRequestId = params['id'];
      this.creditRequestService.getCreditRequest(this.creditRequestId).subscribe(creditRequest => {
        this.creditRequest = creditRequest;
        this.initializeForm(); // Initialize form controls with fetched data
      });
    });
  }

  initializeForm(): void {
    this.entityForm = this.fb.group({
      id: [this.creditRequestId],
      refundPeriod: [this.creditRequest?.refundPeriod || null, Validators.required],
      fixedIncome: [this.creditRequest?.fixedIncome || null, Validators.required],
      amount: [this.creditRequest?.amount || null, Validators.required],
      age: [this.creditRequest?.age || null, Validators.required],
      guarantee: [this.creditRequest?.guarantee || null, Validators.required],
      salary: [this.creditRequest?.salary || null, Validators.required],
      description: [this.creditRequest?.description || null, Validators.required],
      user_id: [this.creditRequest?.user_id || null, Validators.required]
    });
  }

  onSubmit(): void {
    if (this.entityForm?.valid) {
      // Prepare data for submission
      const requestData: CreditRequest = {
        id: this.creditRequestId,
        refundPeriod: this.entityForm.value.refundPeriod,
        fixedIncome: this.entityForm.value.fixedIncome,
        amount: this.entityForm.value.amount,
        age: this.entityForm.value.age,
        guarantee: this.entityForm.value.guarantee,
        salary: this.entityForm.value.salary,
        description: this.entityForm.value.description,
        user_id: this.entityForm.value.user_id
      };
      
      // Send the updated credit request data to the server
      this.creditRequestService.updateCreditRequest(requestData)
        .subscribe(
          () => {
            console.log('Credit request updated successfully.');
            // Optionally, you can navigate to a different route after successful submission
          },
          (error) => {
            console.error('Error updating credit request:', error);
          }
        );
    }  else {
      console.log('Form is invalid. Please check the input fields.');
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

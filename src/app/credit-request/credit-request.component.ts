import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { CreditRequestService } from '../credit-request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-request',
  templateUrl: './credit-request.component.html',
  styleUrls: ['./credit-request.component.css']
})
export class CreditRequestComponent implements OnInit {
  entityForm: FormGroup | undefined;
  

  constructor(private fb: FormBuilder,private crs: CreditRequestService,private router: Router) { }

  ngOnInit(): void {
    this.entityForm = this.fb.group({
      refundPeriod: ['', [Validators.required, this.refundPeriodValidator]],
      fixedIncome: ['', [Validators.required, this.fixedIncomeValidator]],
      amount: ['', [Validators.required, this.amountValidator]],
      age: ['', [Validators.required, this.ageValidator]],
      guarantee: ['', Validators.required],
      salary: ['', [Validators.required, this.salaryValidator]],
      description: ['', Validators.required],
      userId: ['', Validators.required] // assuming userId is the foreign key
    });
  }

  onSubmit() {
    if (this.entityForm?.valid) {
      this.crs.addCreditRequest(this.entityForm.value).subscribe(data=>{
        console.log(data);
      });  
      this.router.navigate(['/creditsr']);
    } else {
      
   
    }
  }

  refundPeriodValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 6 || value > 36) {
      return { invalidRefundPeriod: true };
    }
    return null;
  }

  fixedIncomeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 1000) {
      return { insufficientFixedIncome: true };
    }
    return null;
  }

  amountValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 1000 || value > 100000) {
      return { invalidLoanAmount: true };
    }
    return null;
  }

  ageValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 18 || value > 65) {
      return { invalidAge: true };
    }
    return null;
  }

  salaryValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 500) {
      return { invalidSalary: true };
    }
    return null;
  }
}


import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecoveryService } from '../recovery.service';
import { CreditService } from '../credit.service';
import { Credit } from '../credit.model';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  entityForm: FormGroup | undefined;
  credits:Credit[];
  constructor(private fb: FormBuilder, private rs: RecoveryService, private cs: CreditService) { }

  ngOnInit(): void {
    this.cs.getAllCredits().subscribe((data)=>{
      console.log(data)
      this.credits=data;
    })
    this.initForm();
  }
  toDateF( dateObject) {
    const { year, month, day } = dateObject;
  
    return new Date(year, month - 1, day);
  }
  initForm(): void {
    this.entityForm = this.fb.group({
      amountRecovered: ['', Validators.required],
      date: ['', Validators.required],
      state: ['', Validators.required],
      creditId: ['', Validators.required] // Assuming creditId is the foreign key
    });
  }

  onSubmit(): void {
    const requestData = {
      ...this.entityForm.value,
      date: this.toDateF(this.entityForm.value.date),
      credit: this.credits.find(request=>request.idCredit==this.entityForm.value.creditId),

    }
    console.log(requestData)
    if (this.entityForm?.valid) {
      this.rs.addRecovery(requestData).subscribe(data=>console.log(data))
    } else {
      // Form validation failed, do something
    }
  }
}

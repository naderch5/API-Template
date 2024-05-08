import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Credit } from '../credit.model';
import { RecoveryService } from '../recovery.service';
import { CreditService } from '../credit.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recovery-edit',
  templateUrl: './recovery-edit.component.html',
  styleUrls: ['./recovery-edit.component.css']
})
export class RecoveryEditComponent implements OnInit {
  entityForm: FormGroup | undefined;
  credits:Credit[];
  currentId;
  constructor(private fb: FormBuilder, private rs: RecoveryService, private cs: CreditService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.currentId = params['id'];
    })
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
    this.rs.getRecovery(this.currentId).subscribe((data)=>{
      this.entityForm = this.fb.group({
        amountRecovered: [data.amountRecovered, Validators.required],
        date: [data.date, Validators.required],
        state: [data.state, Validators.required],
        creditId: [data.credit.idCredit, Validators.required] // Assuming creditId is the foreign key
      });
    })

  }

  onSubmit(): void {
    const requestData = {
      ...this.entityForm.value,
      id: this.currentId,
      date: this.toDateF(this.entityForm.value.date),
      credit: this.credits.find(request=>request.idCredit==this.entityForm.value.creditId),

    }
    console.log(requestData)
    if (this.entityForm?.valid) {
      this.rs.updateRecovery(requestData).subscribe(data=>console.log(data))
    } else {
      // Form validation failed, do something
    }
  }
}

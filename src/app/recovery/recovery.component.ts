import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.css']
})
export class RecoveryComponent implements OnInit {
  entityForm: FormGroup | undefined;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
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
    if (this.entityForm?.valid) {
      // Handle form submission
    } else {
      // Form validation failed, do something
    }
  }
}

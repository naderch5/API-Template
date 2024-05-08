import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ContratService } from '../contrat.service';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
@Component({
  selector: 'app-contrat',
  templateUrl: './contrat.component.html',
  styleUrls: ['./contrat.component.css']
})
export class ContratComponent implements OnInit {
  entityForm: FormGroup | undefined;
  projects:Project[] = []; 
  requestId: number | undefined;
  constructor(private fb: FormBuilder,private ps :ProjectService,private pc :ContratService) { }

  ngOnInit(): void {
    this.entityForm = this.fb.group({
      idContrat: [this.requestId],
    period: ['', [Validators.required, this.PeriodValidator]],
      amount: ['', [Validators.required, this.AmountValidator]],
      interest: ['', [Validators.required, this.InterestValidator]],
      partName: ['', [Validators.required, this.PartNameValidator]],
      
      project: ['', Validators.required] // assuming userId is the foreign key
    });
  
  this.ps.getAllProjects().subscribe(projects => {
    this.projects = projects;
    console.log(projects)
});
} 



onSubmit() {
  if (this.entityForm?.valid && this.requestId) {
    console.log("object");
    const requestData = {
      ...this.entityForm.value,
      project: this.projects.find(request=> request.idProject == this.entityForm.value.project) };
    this.pc.addContrat(requestData).subscribe(data=>{
      console.log(data);
    });  
  } else {
    console.log("Form validation failed"+this.requestId);
    // Form validation failed, do something
  }
}

PeriodValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value < 6 || value > 36) {
    return { invalidPeriod: true };
  }
  return null;
}

AmountValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value < 1000) {
    return { insufficientAmount: true };
  }
  return null;
}

InterestValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value < 1000 || value > 100000) {
    return { invalidInterest: true };
  }
  return null;
}

PartNameValidator(control: AbstractControl): ValidationErrors | null {
  const value = control.value;
  if (value.length < 1 || value.length > 65) {
    return { invalidPartName: true };
  }
  return null;
}

}

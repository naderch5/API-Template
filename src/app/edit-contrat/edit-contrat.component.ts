import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ContratService } from '../contrat.service';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
@Component({
  selector: 'app-edit-contrat',
  templateUrl: './edit-contrat.component.html',
  styleUrls: ['./edit-contrat.component.css']
})
export class EditContratComponent implements OnInit {
  entityForm: FormGroup | undefined;
  projects:Project[] = []; 
  requestId: number | undefined;
  constructor(private fb: FormBuilder,private pc :ContratService,private pp :ProjectService ,private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.requestId = Number(params.get('id'));
      this.loadContrat();
    });
    this.entityForm = this.fb.group({
      idContrat: [this.requestId],
    period: ['', [Validators.required, this.PeriodValidator]],
      amount: ['', [Validators.required, this.AmountValidator]],
      interest: ['', [Validators.required, this.InterestValidator]],
      partName: ['', [Validators.required, this.PartNameValidator]],
      
      project: ['', Validators.required] // assuming userId is the foreign key
    });
    this.pp.getAllProjects().subscribe(projects => {
      this.projects = projects;
      console.log(projects)
  });
  }
  loadContrat() {
    if (this.requestId) {
      this.pc.retrieveContrat(this.requestId).subscribe(contrat => {
        this.entityForm?.patchValue(contrat);
      });
    }
  }
  onSubmit() {
    if (this.entityForm?.valid && this.requestId) {
      console.log("object");
      const requestData = {
        ...this.entityForm.value,
        project: this.projects.find(request=> request.idProject == this.entityForm.value.project) };
      this.pc.updateContrat(requestData).subscribe(data=>{
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




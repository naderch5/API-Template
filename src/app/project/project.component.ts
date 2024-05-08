import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ProjectService } from '../project.service';
import { ProjectRequest } from '../project-request.model';
import { ProjectRequestService } from '../project-request.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {
  entityForm: FormGroup | undefined;
  projectRequests:ProjectRequest[] = []; 
  requestId: number | undefined;
  constructor(private fb: FormBuilder,private ps :ProjectService,private prs :ProjectRequestService) { }

  ngOnInit(): void {

    this.entityForm = this.fb.group({
      idProject: [this.requestId],
      name: ['', [Validators.required, this.NameValidator]],
      description: ['', [Validators.required, this.DescriptionValidator]],
      etat: ['', [Validators.required, this.EtatValidator]],
      ptype: ['', [Validators.required, this.TypeValidator]],
      projectRequest: ['', Validators.required] // assuming userId is the foreign key
    });

    // Convert numeric values to strings for the ptype control
    this.prs.getAllProjectRequests().subscribe(projectRequests => {
      this.projectRequests = projectRequests;
      console.log(projectRequests)
  });
    
  }
 

  onSubmit() {
    if (this.entityForm?.valid && this.requestId) {
      console.log("object");
      const requestData = {
        ...this.entityForm.value,
        projectRequest: this.projectRequests.find(request=> request.idRequest == this.entityForm.value.projectRequest) };
      this.ps.addProject(requestData).subscribe(data=>{
        console.log(data);
      });  
    } else {
      console.log("Form validation failed"+this.requestId);
      // Form validation failed, do something
    }
  }
  
  NameValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value.length < 5 || value.length > 100) {
      return { invalidName: true };
    }
    return null;
  }

  DescriptionValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value.length > 1000) {
      return { insufficientDescription: true };
    }
    return null;
  }

  EtatValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value.length < 4 || value.length > 6) {
      return { invalidEtat: true };
    }
    return null;
  }

  TypeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value.length < 3 || value.length > 300) {
      return { invalidType: true };
    }
    return null;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProjectRequestService } from '../project-request.service';
import { ProjectRequest } from '../project-request.model';


@Component({
  selector: 'app-project-request-edit',
  templateUrl: './project-request-edit.component.html',
  styleUrls: ['./project-request-edit.component.css']
})
export class ProjectRequestEditComponent implements OnInit {
  entityForm: FormGroup | undefined;
  requestId: number | undefined;
  constructor(private fb: FormBuilder,
    private prs: ProjectRequestService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.requestId = Number(params.get('id'));
      this.loadProjectRequest();
    });
    this.entityForm = this.fb.group({
      idRequest: [this.requestId],
      risque: ['', [Validators.required, this.RisqueValidator]],
      fundNeeds: ['', [Validators.required, this.FundNeedsValidator]],
      caEstimated: ['', [Validators.required, this.CAEstimatedValidator]],
      initialBudget: ['', [Validators.required, this.InitialBudgetValidator]],
      objectif: ['', Validators.required],
      estimatedProgression: ['', [Validators.required, this.EstimatedProgressionValidator]],
      plannedIncome: ['', [Validators.required, this.PlannedIncomeValidator]]
    });
  }
    
    loadProjectRequest() {
      if (this.requestId) {
        this.prs.retrieveProjectRequest(this.requestId).subscribe(projectRequest => {
          this.entityForm?.patchValue(projectRequest);
        });
      }
    }

    
  


  onSubmit() {
    if (this.entityForm?.valid && this.requestId) {
      this.prs.updateRequest(this.entityForm.value).subscribe(data => {
        console.log(data);
      });
    } else {
      
      console.log("Form validation failed"+this.requestId);
      // Faites quelque chose pour gérer l'échec de la validation du formulaire, comme afficher un message d'erreur
    }
  }
  


  RisqueValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value > 100) {
      return { invalidRisque: true };
    }
    return null;
}

FundNeedsValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value > 1000) {
      return { insufficientFundNeeds: true };
    }
    return null;
}

CAEstimatedValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 1000 || value > 100000) {
      return { invalidCAEstimated: true };
    }
    return null;
}

InitialBudgetValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 1000 || value > 5000000) {
      return { invalidInitialBudget: true };
    }
    return null;
}

EstimatedProgressionValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 0 || value > 100) {
      return { invalidEstimatedProgression: true };
    }
    return null;
}

PlannedIncomeValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (value < 0 || value > 500000000) {
      return { invalidPlannedIncome: true };
    }
    return null;
}

}

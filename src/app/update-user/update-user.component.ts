import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../user/register.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  test : Date = new Date();
  entityForm: FormGroup;
  userId;
  focus;
  focus1;
  focus2;
  constructor(private formBuilder: FormBuilder,private authService: RegisterService, private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.route.paramMap.subscribe(param=>{
      this.userId = Number(param.get('id'));
      this.loadUser();

    })
      this.entityForm = this.formBuilder.group({
        username: ['', [Validators.required, Validators.minLength(5)]],
        firstname: ['', [Validators.required, this.alphabeticalValidator()]],
        lastname: ['', [Validators.required, this.alphabeticalValidator()]],
        telephone: ['',[Validators.required, Validators.pattern(/^\d{8}$/)]],
        address: ['', [Validators.required]],
        cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
        job: ['', [Validators.required]],
        roleName: ['', [Validators.required, Validators.minLength(1)]]
      });
    }
    loadUser(){
      if (this.userId){
        this.authService.getUser(this.userId).subscribe(user=>{
          this.entityForm?.patchValue(user)
        })
      }
    }
    alphabeticalValidator() {
      return (control) => {
        if (control.value && !/^[a-zA-Z]+$/.test(control.value)) {
          return { 'alphabetical': true };
        }
        return null;
      };
    }
    mapRoleNameToAuthority(roleName:String){
      switch (roleName) {
        case "USER":
          return {roleId: 2, authority:"USER"}
          break;
        case "ADMIN":
          return {roleId: 1, authority:"ADMIN"}

          break;
        default:
          return {roleId: 3, authority:"INVESTOR"}
          break;
      }
    }
    onSubmit(): void {
      if (this.entityForm.valid) {
  
        const rd = {
          ...this.entityForm.value,
          authorities: [this.mapRoleNameToAuthority(this.entityForm.value.roleName)]
        }
        this.authService.updateUser(this.userId,rd).subscribe((data)=>{
          console.log(data);
        })
      } else {
        // Form is invalid, mark all fields as touched to display error messages
        this.entityForm.markAllAsTouched();
      }
    }
  
  }


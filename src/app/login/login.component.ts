import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../user/register.service';
import { Router } from '@angular/router';
import { IAlert } from '../sections/alerts-section/alerts-section.component';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  loginForm: FormGroup;
  rememberMe=false;
  h=true;
  alert={
    id: 4,
    type: 'danger',
    strong: 'Danger!',
    message: 'This is a danger alert—check it out!',
    icon: 'ni ni-support-16'
};
  constructor(private formBuilder: FormBuilder,private authService:RegisterService, private router:Router) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required ]],
      password: ['', [Validators.required]]});
    }
  onSubmit(): void{
    console.log("aaaaaaaaaaaaaaaaaa");
    if (this.loginForm.valid) {
      console.log("aaaaaaaaaaaaaaa");
      
      this.authService.loginUser(this.loginForm.value.username,this.loginForm.value.password).pipe(
        catchError((error) => {
          if (error.status === 401) {
            this.h = false;
            // You might want to handle other error statuses as well
          }
          return throwError(error);
        })
      ).subscribe((data)=>{
        console.log(data);
        this.authService.token= data.jwt;
        this.authService.user=JSON.stringify(data.user);
        if (data.jwt){
          this.router.navigate(['users'])
        }
        if (!data){
          this.h=false;
        }
        if (this.rememberMe) {
          console.log("remembered");
          localStorage.setItem('currentUser', JSON.stringify(data.user)); 
          localStorage.setItem('token', data.jwt);
        } else {
          
          localStorage.removeItem('currentUser');
          localStorage.removeItem('token');
        }
      })

    }
    else {
      this.loginForm.markAllAsTouched();
    }
  }
  close(alert: IAlert) {
    this.h=false;
    this.alert=null
  }
  toggleRememberMe(): void {
    console.log("changed");
    this.rememberMe = !this.rememberMe;
  }

}

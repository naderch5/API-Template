import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../user/register.service';

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

  constructor(private formBuilder: FormBuilder,private authService:RegisterService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required ]],
      password: ['', [Validators.required]]});
    }
  onSubmit(): void{
    console.log("aaaaaaaaaaaaaaaaaa");
    if (this.loginForm.valid) {
      console.log("aaaaaaaaaaaaaaa");
      this.authService.loginUser(this.loginForm.value.username,this.loginForm.value.password).subscribe((data)=>{
        console.log(data);
        this.authService.token= data.jwt;
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
  toggleRememberMe(): void {
    console.log("changed");
    this.rememberMe = !this.rememberMe;
  }

}

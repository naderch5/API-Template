import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../user/register.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
    test : Date = new Date();
    registerForm: FormGroup;

    focus;
    focus1;
    focus2;
    constructor(private formBuilder: FormBuilder,private authService: RegisterService) { }
    ngOnInit(): void {
        this.registerForm = this.formBuilder.group({
          username: ['', [Validators.required, Validators.minLength(5)]],
          password: ['', [Validators.required, Validators.minLength(8)]],
          firstname: ['', [Validators.required, this.alphabeticalValidator()]],
          lastname: ['', [Validators.required, this.alphabeticalValidator()]],
          telephone: ['',[Validators.required, Validators.pattern(/^\d{8}$/)]],
          address: ['', [Validators.required]],
          cin: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]],
          job: ['', [Validators.required]],
          roleName: ['', [Validators.required, Validators.minLength(1)]]
        });
      }
    
      alphabeticalValidator() {
        return (control) => {
          if (control.value && !/^[a-zA-Z]+$/.test(control.value)) {
            return { 'alphabetical': true };
          }
          return null;
        };
      }
      onSubmit(): void {
        if (this.registerForm.valid) {
            const formData = {
                ...this.registerForm.value,
                telephone: parseInt(this.registerForm.value.telephone, 10),
                cin: parseInt(this.registerForm.value.cin, 10)
            };
          // Call your authentication service to handle form submission
          console.log('Form submitted:', this.registerForm.value);
          this.authService.loginUser("admin","admin").subscribe((data)=>{
            console.log(data);
          })
          this.authService.registerUser(formData).subscribe((data)=>{
            console.log(data);
          })
        } else {
          // Form is invalid, mark all fields as touched to display error messages
          this.registerForm.markAllAsTouched();
        }
      }
    
    }

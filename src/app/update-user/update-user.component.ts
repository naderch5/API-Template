import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RegisterService } from '../user/register.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {

  test : Date = new Date();
  entityForm: FormGroup;
  imageSrc: string[] = [''];

  userId;
  focus;
  focus1;
  focus2;
  file;
  blob;
  filetype;
  constructor(private formBuilder: FormBuilder,private authService: RegisterService, private route:ActivatedRoute, private router: Router) { }
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
      profileImage: [null],
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


  // handleInputChange(e) {
  //   this.file = e.target.files[0];

  //   var file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  //   var pattern = /image-*/;
  //   var reader = new FileReader();
  //   if (!file.type.match(pattern)) {
  //     alert('invalid format');
  //     return;
  //   }
  //   reader.onload = this._handleReaderLoaded.bind(this);
  //   reader.readAsDataURL(file);
  // }
  // _handleReaderLoaded(e) {
  //   let reader = e.target;
  //   this.imageSrc = [reader.result];
  //   console.log(this.imageSrc)
  // }
  onFileChange(event): void {
    if (event.target.files.length > 0) {
      this.file = event.target.files[0];
      this.filetype= this.file.type;
      const fileReader = new FileReader();
      fileReader.onload = (event) => {
        const base64String = event.target.result as string;
        // Set the base64 string directly as the value for profileImage field
        this.file=base64String;
      };
      fileReader.readAsDataURL(this.file);
    }
  }

  onSubmit(): void {
    if (this.entityForm.valid) {
      const byteCharacters = atob(this.file.split(',')[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    console.log(byteArray);
    console.log(this.file);
      const formData = {...this.entityForm.value,profileImage: this.file,         profileImageContentType: this.filetype
      }
      console.log(formData);
      this.authService.updateUser(this.userId, formData).subscribe((data)=>{
        console.log(data);
        if (data){
          this.router.navigate(['users'])
        }
      });

    } else {
      // Form is invalid, mark all fields as touched to display error messages
      this.entityForm.markAllAsTouched();
    }
  }
}

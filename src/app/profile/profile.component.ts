import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../user/register.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss']
})

export class ProfileComponent implements OnInit {
    user
    image
    constructor(private us: RegisterService,    private sanitizer: DomSanitizer    ) { }

    ngOnInit(
       
    ) {
        this.us.getUser(3).subscribe((data)=>{
            this.user=data;
            console.log(data);
            let objectURL = 'data:' + data.profileImageContentType + ';base64,' + data.profileImage;
            // let objectURL = 'blob:http://127.0.0.1:4200/' + data.profileImage;

            this.image = objectURL;
        })
    }

}

import { Component, OnInit } from '@angular/core';
import { RegisterService } from '../user/register.service';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:User[];
  // pagedProjectRequests: ProjectRequest[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private us: RegisterService) { }

  ngOnInit(): void {
    console.log("aaaaaaaaaaaaaaaa")
    this.us.getAllUsers().subscribe(data=>{
      this.users=data;
    });
  }
  
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    // this.pagedProjectRequests = this.projectrequests.slice(startIndex, endIndex);
  }

  deleteUser(id) {
    console.log(id);
    this.us.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(projectRequest => projectRequest.userId !== id);
      this.totalItems = this.users.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }


}

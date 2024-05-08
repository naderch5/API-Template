import { Component, OnInit } from '@angular/core';

import { ProjectRequestService } from '../project-request.service';
import { ProjectRequest } from '../project-request.model';
@Component({
  selector: 'app-project-request-show',
  templateUrl: './project-request-show.component.html',
  styleUrls: ['./project-request-show.component.css']
})
export class ProjectRequestShowComponent implements OnInit {
  projectrequests:ProjectRequest[];
  pagedProjectRequests: ProjectRequest[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private prs: ProjectRequestService) { }

  ngOnInit(): void {
    console.log("aaaaaaaaaaaaaaaa")
    this.prs.retrieveProjectRequests().subscribe(projectrequests => {
      this.projectrequests = projectrequests;
      console.log(projectrequests)
      this.totalItems = projectrequests.length;
      this.setPage(1); 
    });
  }
  
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.pagedProjectRequests = this.projectrequests.slice(startIndex, endIndex);
  }

  deleteRequest(id) {
    console.log(id);
    this.prs.deleteRequest(id).subscribe(() => {
      this.projectrequests = this.projectrequests.filter(projectRequest => projectRequest.idRequest !== id);
      this.totalItems = this.projectrequests.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }

  }



import { Component, OnInit } from '@angular/core';

import { ProjectService } from './../project.service';
import { Project } from '../project.model';
import { ProjectRequestService } from '../project-request.service';
import { ProjectRequest } from '../project-request.model';
@Component({
  selector: 'app-project-show',
  templateUrl: './project-show.component.html',
  styleUrls: ['./project-show.component.css']
})
export class ProjectShowComponent implements OnInit {
  projects:Project[];
  projectrequests:ProjectRequest[];
  pagedProjects: Project[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private ps: ProjectService,private prs: ProjectRequestService) { }

  ngOnInit(): void {
    console.log("aaaaaaaaaaaaaaaa")
    this.ps.retrieveProjects().subscribe(projects => {
      this.projects = projects;
      console.log(projects)
      this.totalItems = projects.length;
      this.setPage(1); 
    });
  }
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.pagedProjects = this.projects.slice(startIndex, endIndex);
  }
  deleteProject(id) {
    console.log(id);
    this.ps.deleteProject(id).subscribe(() => {
      this.projects = this.projects.filter(project => project.idProject !== id);
      this.totalItems = this.projects.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }
}

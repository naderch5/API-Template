import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { ContratService } from '../contrat.service';
import { ProjectService } from '../project.service';
import { Project } from '../project.model';
import { Contrat } from '../contrat.model';
@Component({
  selector: 'app-contrat-show',
  templateUrl: './contrat-show.component.html',
  styleUrls: ['./contrat-show.component.css']
})
export class ContratShowComponent implements OnInit {
  projects:Project[];
  contrats:Contrat[];
  pagedContrats: Contrat[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private ps: ProjectService,private cs: ContratService) { }

  ngOnInit(): void {
    console.log("aaaaaaaaaaaaaaaa")
    this.cs.retrieveContrats().subscribe(contrats => {
      this.contrats = contrats;
      console.log(contrats)
      this.totalItems = contrats.length;
      this.setPage(1); 
    });
  }
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.pagedContrats = this.contrats.slice(startIndex, endIndex);
  }
  deleteContrat(id) {
    console.log(id);
    this.cs.deleteContrat(id).subscribe(() => {
      this.contrats = this.contrats.filter(contrat => contrat.idContrat !== id);
      this.totalItems = this.contrats.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }
}

import { Component, OnInit } from '@angular/core';
import { CreditService } from '../credit.service';
import { Credit } from '../credit.model';

@Component({
  selector: 'app-credit-show',
  templateUrl: './credit-show.component.html',
  styleUrls: ['./credit-show.component.css']
})
export class CreditShowComponent implements OnInit {
  credits:Credit[];
  pagedCredits: Credit[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private cs: CreditService) { }

  ngOnInit(): void {
    this.cs.getAllCredits().subscribe(credits => {
      this.credits = credits;
      this.totalItems = credits.length;
      this.setPage(1); 
    });
  }
  
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.pagedCredits = this.credits.slice(startIndex, endIndex);
  }

  deleteCredit(id) {
    console.log(id);
    this.cs.deleteCredit(id).subscribe(() => {
      this.credits = this.credits.filter(credit => credit.idCredit !== id);
      this.totalItems = this.credits.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }

}

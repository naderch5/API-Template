import { Component, OnInit } from '@angular/core';
import { CreditRequestService } from '../credit-request.service';
import { CreditRequest } from '../credit-request.model';

@Component({
  selector: 'app-credit-r-show',
  templateUrl: './credit-r-show.component.html',
  styleUrls: ['./credit-r-show.component.css']
})
export class CreditRShowComponent implements OnInit {
  creditRequests: CreditRequest[];
  pagedCreditRequests: CreditRequest[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;

  constructor(private crs: CreditRequestService) { }

  ngOnInit(): void {
    this.crs.getAllCreditRequests().subscribe(creditRequests => {
      this.creditRequests = creditRequests;
      this.totalItems = creditRequests.length;
      this.setPage(1);
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.pagedCreditRequests = this.creditRequests.slice(startIndex, endIndex);
  }

  deleteCreditRequest(id: number) {
    this.crs.deleteCreditRequest(id).subscribe(() => {
      this.creditRequests = this.creditRequests.filter(creditRequest => creditRequest.id !== id);
      this.totalItems = this.creditRequests.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }
}

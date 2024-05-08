import { Component, OnInit } from '@angular/core';
import { Recovery } from '../recovery.model';
import { RecoveryService } from '../recovery.service';

@Component({
  selector: 'app-recovery-show',
  templateUrl: './recovery-show.component.html',
  styleUrls: ['./recovery-show.component.css']
})
export class RecoveryShowComponent implements OnInit {

  recoveries:Recovery[];
  pagedCredits: Recovery[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  constructor(private cs: RecoveryService) { }

  ngOnInit(): void {
    this.cs.getAllRecoveries().subscribe(recoveries => {
      this.recoveries = recoveries;
      this.totalItems = recoveries.length;
      this.setPage(1); 
    });
  }
  
  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.totalItems);
    this.pagedCredits = this.recoveries.slice(startIndex, endIndex);
  }

  deleteCredit(id) {
    console.log(id);
    this.cs.deleteRecovery(id).subscribe(() => {
      this.recoveries = this.recoveries.filter(credit => credit.id !== id);
      this.totalItems = this.recoveries.length;
      this.setPage(this.currentPage); // Refresh pagination
    });
  }

}

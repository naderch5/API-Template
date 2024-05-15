import { Component, OnInit } from '@angular/core';
import { PdfService } from './../pdf.service';
import { CreditService } from './../credit.service';
import { Credit } from './../credit.model';

@Component({
  selector: 'app-credit-show',
  templateUrl: './credit-show.component.html',
  styleUrls: ['./credit-show.component.css']
})
export class CreditShowComponent implements OnInit {
  credits: Credit[];
  pagedCredits: Credit[] = [];
  totalItems: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 5;
  pdfUrl: string;
  active1;
  round;
// URL of the generated PDF

  constructor(private cs: CreditService, private pdfService: PdfService) { }

  ngOnInit(): void {
    this.cs.getAllCredits().subscribe(credits => {
      this.credits = credits;
      this.totalItems = credits.length;
      this.setPage(1);
      this.round=Array.from(Array(Math.ceil(this.totalItems/this.itemsPerPage)).keys())
    });
  }

  setPage(page: number) {
    this.currentPage = page;
    const startIndex = (page - 1) * this.itemsPerPage;
    const endIndex = (page)*this.itemsPerPage;
    
    console.log("si: "+startIndex+" / ei: "+endIndex)
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
  
   // Method to generate PDF
   generatePdf(id: number): void {
    // Call CreditService to generate PDF
    this.cs.generatePdf(id).subscribe(
      (pdfData: Blob) => {
        const file = new Blob([pdfData], { type: 'application/pdf' });
        this.pdfUrl = URL.createObjectURL(file);
        window.open(this.pdfUrl,"_blank")
      },
      error => {
        console.error('Error fetching PDF:', error);
        // Handle error
      }
    );
  }
}

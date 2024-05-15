import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfService {

  constructor(private http: HttpClient) { }

  // Method to fetch PDF data from the backend
  getPdf(id: number): Observable<Blob> {
    // Adjust the URL to match your Spring Boot application's endpoint
    const url = `http://localhost:8082/loan/user/pdf/${id}`; // Replace with your actual URL

    // Make an HTTP GET request to fetch the PDF data
    return this.http.get(url, { responseType: 'blob' });
  }
}

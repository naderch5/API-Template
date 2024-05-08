import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditRequest } from './credit-request.model';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {
  private baseUrl = 'http://localhost:8082/loan/user/creditrequest';

  constructor(private http: HttpClient) { }

  addCreditRequest(creditRequest: CreditRequest): Observable<CreditRequest> {
    return this.http.post<CreditRequest>(`${this.baseUrl}`, creditRequest);
  }

  getCreditRequest(id: number): Observable<CreditRequest> {
    return this.http.get<CreditRequest>(`${this.baseUrl}/${id}`);
  }

  getAllCreditRequests(): Observable<CreditRequest[]> {
    return this.http.get<CreditRequest[]>(`${this.baseUrl}s`);
  }

  updateCreditRequest(creditRequest: CreditRequest): Observable<CreditRequest> {
    return this.http.put<CreditRequest>(`${this.baseUrl}`, creditRequest);
  }

  deleteCreditRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  calculateRiskScore(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/risk/${id}`);
  }

  // Add more custom endpoints as needed
}

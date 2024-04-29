import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CreditRequest } from './credit-request.model';

@Injectable({
  providedIn: 'root'
})
export class CreditRequestService {
  private baseUrl = 'http://localhost:8082/loan/user/credit-request';

  constructor(private http: HttpClient) { }

  addCreditRequest(creditRequest: CreditRequest): Observable<CreditRequest> {
    return this.http.post<CreditRequest>(`${this.baseUrl}/creditrequest`, creditRequest);
  }

  getCreditRequest(id: number): Observable<CreditRequest> {
    return this.http.get<CreditRequest>(`${this.baseUrl}/creditrequest/${id}`);
  }

  getAllCreditRequests(): Observable<CreditRequest[]> {
    return this.http.get<CreditRequest[]>(`${this.baseUrl}/creditrequests`);
  }

  updateCreditRequest(id: number, creditRequest: CreditRequest): Observable<CreditRequest> {
    return this.http.put<CreditRequest>(`${this.baseUrl}/creditrequest/${id}`, creditRequest);
  }

  deleteCreditRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/creditrequest/${id}`);
  }

  calculateRiskScore(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/creditrequest/risk/${id}`);
  }

  // Add more custom endpoints as needed
}

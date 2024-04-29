import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Credit } from './credit.model';

@Injectable({
  providedIn: 'root'
})
export class CreditService {
  private baseUrl = 'http://localhost:8082/loan/user/credit';

  constructor(private http: HttpClient) { }

  addCredit(credit: Credit): Observable<Credit> {
    return this.http.post<Credit>(`${this.baseUrl}/credit`, credit);
  }

  getRemainingDaysUntilDeadline(id: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/credit/${id}/remaining-days`);
  }

  getCredit(id: number): Observable<Credit> {
    return this.http.get<Credit>(`${this.baseUrl}/credit/${id}`);
  }

  getAllCredits(): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.baseUrl}/credit`);
  }

  getFilteredCredits(threshold: number): Observable<Credit[]> {
    return this.http.get<Credit[]>(`${this.baseUrl}/credit/interestRate/${threshold}`);
  }

  deleteCredit(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/credit/${id}`);
  }

  updateCredit(credit: Credit): Observable<Credit> {
    return this.http.put<Credit>(`${this.baseUrl}/credit`, credit);
  }
}

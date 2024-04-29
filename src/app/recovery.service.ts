import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recovery } from './recovery.model';

@Injectable({
  providedIn: 'root'
})
export class RecoveryService {
  private baseUrl = 'http://localhost:8082/loan/user/recovery';

  constructor(private http: HttpClient) { }

  // Add a new recovery entry
  addRecovery(recovery: Recovery): Observable<Recovery> {
    return this.http.post<Recovery>(`${this.baseUrl}`, recovery);
  }

  // Retrieve a single recovery entry by its ID
  getRecovery(id: number): Observable<Recovery> {
    return this.http.get<Recovery>(`${this.baseUrl}/${id}`);
  }

  // Retrieve all recovery entries
  getAllRecoveries(): Observable<Recovery[]> {
    return this.http.get<Recovery[]>(`${this.baseUrl}`);
  }

  // Update an existing recovery entry
  updateRecovery(recovery: Recovery): Observable<Recovery> {
    return this.http.put<Recovery>(`${this.baseUrl}`, recovery);
  }

  // Delete a recovery entry by its ID
  deleteRecovery(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Calculate the total recovered amount
  calculateTotalRecoveredAmount(): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/total-recovered`);
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contrat } from './contrat.model';

@Injectable({
  providedIn: 'root'
})
export class ContratService {
  private baseUrl = 'http://localhost:8082/project/contrat';

  constructor(private http: HttpClient) { }

  addContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.post<Contrat>(`${this.baseUrl}`, contrat);
  }

  retrieveContrat(id: number): Observable<Contrat> {
    console.log(id);
    return this.http.get<Contrat>(`${this.baseUrl}/${id}`);
  }

  retrieveContrats(): Observable<Contrat[]> {
    return this.http.get<Contrat[]>(`${this.baseUrl}`);
  }

  deleteContrat(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateContrat(contrat: Contrat): Observable<Contrat> {
    return this.http.put<Contrat>(`${this.baseUrl}`, contrat);
  }

  getAllContrats():Observable<Contrat[]>{
    return this.http.get<Contrat[]>(`${this.baseUrl}/contrats`);
  }

}

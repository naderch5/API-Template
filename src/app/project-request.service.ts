
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectRequest } from './project-request.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectRequestService {
  private baseUrl ='http://localhost:8082/project/api/projectrequest'
  constructor(private http: HttpClient) { 

  }
  addRequest(projectRequest: ProjectRequest): Observable<ProjectRequest> {
    return this.http.post<ProjectRequest>(`${this.baseUrl}/ajout`, projectRequest);
  }

  retrieveProjectRequest(id: number): Observable<ProjectRequest> {
    return this.http.get<ProjectRequest>(`http://localhost:8082/project/api/projectRequest/${id}`);
  }

  retrieveProjectRequests(): Observable<ProjectRequest[]> {
    return this.http.get<ProjectRequest[]>(`${this.baseUrl}s`);
  }

  deleteRequest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/delete/${id}`);
  }

  updateRequest(project: ProjectRequest): Observable<ProjectRequest> {
    return this.http.put<ProjectRequest>(`${this.baseUrl}/update`, project);
  }


 // updateRequest(projectRequest: ProjectRequest): Observable<ProjectRequest> {
   // return this.http.put<ProjectRequest>(`${this.baseUrl}/projectrequest/update`, projectRequest);
  //}





  getProjectTypeStatisticsChart(): Observable<any> {
    return this.http.get(`${this.baseUrl}/project-type-statistics-chart`, { responseType: 'blob' });
  }

  searchProjectByAttribute(attributeName: string, attributeValue: string): Observable<ProjectRequest> {
    return this.http.get<ProjectRequest>(`${this.baseUrl}/search?attributeName=${attributeName}&attributeValue=${attributeValue}`);
  }


  getAllProjectRequests():Observable<ProjectRequest[]>{
    return this.http.get<ProjectRequest[]>(`http://localhost:8082/project/api/projectrequests`);
  }
}

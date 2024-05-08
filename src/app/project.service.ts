import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Project } from './project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private baseUrl = 'http://localhost:8082/project/project';

  constructor(private http: HttpClient) { }

  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.baseUrl}/ajoutproject`, project);
  }

  retrieveProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/${id}`);
  }

  retrieveProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.baseUrl}`);
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/deleteproject/${id}`);
  }

  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.baseUrl}/updateproject`, project);
  }


 // updateRequest(projectRequest: ProjectRequest): Observable<ProjectRequest> {
   // return this.http.put<ProjectRequest>(`${this.baseUrl}/projectrequest/update`, projectRequest);
  //}





  getProjectTypeStatisticsChart(): Observable<Blob> {
    return this.http.get(`http://localhost:8082/project/project/project-type-statistics-chart`, { responseType: 'blob' });
  }

  searchProjectByAttribute(attributeName: string, attributeValue: string): Observable<Project> {
    return this.http.get<Project>(`${this.baseUrl}/search?attributeName=${attributeName}&attributeValue=${attributeValue}`);
  }


  getAllProjects():Observable<Project[]>{
    return this.http.get<Project[]>(`${this.baseUrl}/projects`);
  }
}

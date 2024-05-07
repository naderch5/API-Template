import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../user';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private baseUrl = 'http://localhost:8082/auth'; 
  public token = "";
  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);

    return this.http.post(`${this.baseUrl}/register`, user,{headers});
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }
  getAllUsers(): Observable<any> {
    /*const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers); */
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get("http://localhost:8082/admin/all", { headers });
    } else {
      // Handle case where token doesn't exist
      // For example, redirect to login page
      return null;
    }
  
  }
  getUser(id: number): Observable<any> {
    /*const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers); */
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.get("http://localhost:8082/admin/"+id, { headers });
    } else {
      // Handle case where token doesn't exist
      // For example, redirect to login page
      return null;
    }
  
  }
  updateUser(id:number,user: User): Observable<any> {
    /*const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers); */
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.put("http://localhost:8082/admin/"+id,user, { headers });
    } else {
      // Handle case where token doesn't exist
      // For example, redirect to login page
      return null;
    }
  
  }
  deleteUser(id: number): Observable<any> {
    /*const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers); */
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.delete("http://localhost:8082/admin/"+id, { headers });
    } else {
      // Handle case where token doesn't exist
      // For example, redirect to login page
      return null;
    }
  
  }
  sendMessage(message:any): Observable<any> {
    /*const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers); */
    const token = localStorage.getItem('token');
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`
      });
      return this.http.post("http://localhost:8082/api/messages",message, { headers });
    } else {
      // Handle case where token doesn't exist
      // For example, redirect to login page
      return null;
    }
  
  }
  getMessages(): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const token = localStorage.getItem('token');
    // Ensure token exists before adding to headers
    let headers = {};
    if (token) {
      headers = {
        'Authorization': `Bearer ${token}`
      };
    }
    console.log(headers);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Access the userId property from the currentUser object
    const userId = currentUser.userId;
    return this.http.get(`http://localhost:8082/api/messages/latest/${userId}`,{headers});
  }  
  getChat(id: number): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const token = localStorage.getItem('token');
    // Ensure token exists before adding to headers
    let headers = {};
    if (token) {
      headers = {
        'Authorization': `Bearer ${token}`
      };
    }
    console.log(headers);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Access the userId property from the currentUser object
    const userId = currentUser.userId;
    return this.http.get(`http://localhost:8082/api/messages/${userId}/${id}`,{headers});
  }  
  getNewConnections(id: number): Observable<any> {
    // const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    const token = localStorage.getItem('token');
    // Ensure token exists before adding to headers
    let headers = {};
    if (token) {
      headers = {
        'Authorization': `Bearer ${token}`
      };
    }
    console.log(headers);
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    // Access the userId property from the currentUser object
    const userId = currentUser.userId;
    return this.http.get(`http://localhost:8082/api/messages/newMessages/${id}`,{headers});
  }  
}

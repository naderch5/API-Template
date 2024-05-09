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
  public user;
  constructor(private http: HttpClient) { }

  registerUser(user: any): Observable<any> {
    const token = localStorage.getItem('token') || this.token;

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post(`${this.baseUrl}/register`, user,{headers});
  }

  loginUser(username: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/login`, { username, password });
  }
  getAllUsers(): Observable<any> {
    /*const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers); */
    const token = localStorage.getItem('token') || this.token;
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
    const token = localStorage.getItem('token') || this.token;
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

  updateUser(id: number, user: any): Observable<any> {
    console.log(user);
    const token = localStorage.getItem('token') || this.token;
    if (token) {
      const headers = new HttpHeaders({
        'Authorization': `Bearer ${token}`      });
      const formData = new FormData()

      formData.append('username', user.username);
      formData.append('firstname', user.firstname);
      formData.append('lastname', user.lastname);
      formData.append('telephone', user.telephone);
      formData.append('address', user.address);
      formData.append('cin', user.cin);
      formData.append('job', user.job);
      formData.append('profileImage', user.profileImage as Blob); 
      formData.append('roleName', user.roleName);
      formData.append('profileImageContentType',user.profileImageContentType)
      formData.append('authorities', JSON.stringify(user.authorities));
   
  
  
      return this.http.put(`http://localhost:8082/admin/${id}`, formData, { headers });
    } else {
      return null;
    }
  }
  
  deleteUser(id: number): Observable<any> {
    /*const headers = new HttpHeaders().set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    console.log(headers); */
    const token = localStorage.getItem('token') || this.token;
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
    const token = localStorage.getItem('token') || this.token;
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
    const token = localStorage.getItem('token') || this.token;
    // Ensure token exists before adding to headers
    let headers = {};
    if (token) {
      headers = {
        'Authorization': `Bearer ${token}`
      };
    }
    console.log(headers);
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(this.user);

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
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(this.user);

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
    const currentUser = JSON.parse(localStorage.getItem('currentUser')) || JSON.parse(this.user);

    // Access the userId property from the currentUser object
    const userId = currentUser.userId;
    return this.http.get(`http://localhost:8082/api/messages/newMessages/${id}`,{headers});
  }  
  calculateRolePercentage(): Observable<any> {
    return this.http.get(`http://localhost:8082/admin/calculateRolePercentage`);
  }
}

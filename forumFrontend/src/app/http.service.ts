import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {JwtService} from "./jwt.service";
import {catchError, finalize} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private lastRequest: any;


  constructor(private http: HttpClient, private jwtService: JwtService) {}

  private url = 'http://localhost:3000/';

  login(username: string, password: string) {
    const credentials = { username, password};
    return this.http.post(`${this.url}auth/login`, credentials);
  }

  register(email: string, username: string, password: string) {
    const credentials = { email, username, password };
    return this.http.post(`${this.url}auth/register`, credentials);
  }



  isLoggedIn() {
    return this.http.get(`${this.url}auth/isLoggedIn`);
  }



  createPost(title: string, content: string) {
    const token = this.jwtService.getToken();
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`,
    });

    console.log(token);

    console.log(headers);

    return this.http.post(`${this.url}posts/create`, { title, content }, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            // Redirect the user to the login page or show a message to refresh the token
            console.log('Unauthorized');
          } else {
            console.log(error);
          }
          throw error;
        }
      ),
      finalize(() => {
        // Hide the loading indicator or disable the loading button
        console.log('Request complete');
      }));
  }
  getPosts() {
      const token = this.jwtService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.url}posts`, { headers });
  }

  getPost(id: string) {
    const token = this.jwtService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get(`${this.url}posts/${id}`, { headers });
  }

  updatePost(post: any) {
    const token = this.jwtService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.put(`${this.url}posts/${post._id}/update`, post, { headers });
  }

  deletePost(id: string) {
    const token = this.jwtService.getToken();
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.delete(`${this.url}posts/${id}`, { headers });
  }

}

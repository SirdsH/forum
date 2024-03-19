import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  private lastRequest: any;


  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/';

  login(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post(`${this.url}auth/login`, credentials);
  }

  register(username: string, password: string) {
    const credentials = { username, password };
    return this.http.post(`${this.url}users/register`, credentials);
  }

  getPosts() {
    this.lastRequest = this.http.get(`${this.url}posts`);
    return this.lastRequest;
  }

  createPost(post: any) {
    this.lastRequest = this.http.post(`${this.url}posts`, post);
    return this.lastRequest;
  }

  getLastRequest(): any {
    return this.lastRequest;
  }

}

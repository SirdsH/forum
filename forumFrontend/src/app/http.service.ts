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

}

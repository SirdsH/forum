import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JwtService {

  constructor() { }

  getToken(): any {
    return sessionStorage.getItem('access_token');
  }

  saveToken(token: string): void {
    sessionStorage.setItem('access_token', token);
  }

  destroyToken(): void {
    sessionStorage.removeItem('access_token');
  }
}

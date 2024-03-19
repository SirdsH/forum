import { Component } from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private httpService: HttpService) {}

  onSubmit() {
    this.httpService.login(this.username, this.password).subscribe(
      (response) => {
        // Handle successful login
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

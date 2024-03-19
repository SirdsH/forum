import { Component } from '@angular/core';
import {HttpService} from "../http.service";
import {ERROR} from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";
import {Router} from "@angular/router";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private httpService: HttpService, private router: Router, ) {}

  onSubmit() {
    this.httpService.login(this.username, this.password).subscribe(
      (response) => {
        // Handle successful login
        this.router.navigate(['forum']);
      },
      (error) => {
        // Handle failed login
        error
      }
    );
  }
}

import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private httpService: HttpService, private router: Router) {}

  register() {
    this.httpService.register(this.username, this.password).subscribe((res: any) => {
      this.router.navigate(['/login']);
    }, (err) => {
      console.log(err);
    });
  }



}

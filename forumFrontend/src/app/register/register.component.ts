import { Component } from '@angular/core';
import { HttpService } from '../http.service';
import {Router} from "@angular/router";
import {Validators, FormBuilder, FormGroup} from "@angular/forms";
import {AnalyticsService} from "../analytics.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide = true;

  constructor(private httpService: HttpService, private router: Router, private formBuilder: FormBuilder, private analyticsService: AnalyticsService) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.analyticsService.trackEvent('page_view', 'Register page viewed', 'REGISTER_PAGE');
  }
  register() {
    if (this.registerForm.valid) {
      const email = this.registerForm.get('email')?.value || '';
      const username = this.registerForm.get('username')?.value || '';
      const password = this.registerForm.get('password')?.value || '';

      this.httpService.register(email, username, password).subscribe((res: any) => {
        this.router.navigate(['/login']);
      }, (err) => {
        console.log(err);
      });
    }
  }
}

import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient} from "@angular/common/http";
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from "@angular/material/snack-bar";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router, private snackBar: MatSnackBar) {
  }

  onSubmit() {
    if (!this.username || !this.password) {
      this.openSnackBar('Both username and password are required.', 'Close');
      return;
    }

    this.http.post('http://localhost:3000/auth/login', {username: this.username, password: this.password}).subscribe(
      (response) => {
        sessionStorage.setItem('access_token', JSON.stringify(response));
        this.router.navigate(['/home']);
      },
      (error) => {
        console.log(error);
        this.openSnackBar('Invalid username or password.', 'Close');
      }
    );
  }

  openSnackBar(message: string, action: string, horizontalPosition: MatSnackBarHorizontalPosition = 'right', verticalPosition: MatSnackBarVerticalPosition = 'bottom'): void {
    this.snackBar.open(message, action, {
      horizontalPosition,
      verticalPosition,
      duration: 3000
    });
  }
}

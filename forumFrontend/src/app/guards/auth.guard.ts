import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
    if (sessionStorage.getItem('access_token')) {
      return true;
    } else {
      this.snackBar.open('You\'re not authorized', 'Close', {
        duration: 5000,
        panelClass: ['warning-snackbar']
      });
      this.router.navigate(['/login']);
      return false;
    }
  }
}

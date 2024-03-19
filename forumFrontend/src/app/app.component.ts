import {Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'forumFrontend';

  constructor() {
  }

  ngOnInit() {
  }

  // Use the localStorage object here
  isLoggedIn() {
    return localStorage.getItem('token') !== null;
  }

  logout() {
    localStorage.removeItem('token');
  }


}

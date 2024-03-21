import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {HttpService} from "../http.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  posts: any;
  constructor(private router: Router, private httpService: HttpService) {
  }

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.httpService.getPosts().subscribe((res: any) => {
      this.posts = res;
    }, (err) => {
      console.log(err);
    });
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  createPost() {
    this.router.navigate(['createPost']);
  }
}

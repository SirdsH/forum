import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import {AnalyticsService} from "../analytics.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  doc: any;
  posts: any;

  constructor(private httpService: HttpService, private router: Router, private analyticsService: AnalyticsService) {
  }

  ngOnInit() {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      const accessTokenObject = JSON.parse(accessToken);
      this.doc = accessTokenObject._doc;
      this.getPosts();
    }
    this.analyticsService.trackEvent('page_view', 'Profile page viewed', 'PROFILE_PAGE');
  }

  getPosts() {
    this.httpService.getPostsByUser(this.doc._id).subscribe(
      (response) => {
        this.posts = response;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deletePost(id: string) {
    this.httpService.deletePost(id).subscribe(
      (response) => {
        this.getPosts();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  home() {
    this.router.navigate(['/home']);
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }
}

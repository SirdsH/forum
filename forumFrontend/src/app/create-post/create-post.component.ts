import {Component} from '@angular/core';
import {HttpService} from "../http.service";
import {Router} from "@angular/router";
import {AnalyticsService} from "../analytics.service";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrl: './create-post.component.scss'
})
export class CreatePostComponent {
  doc: any;
  title: string = '';
  content: string = '';

  constructor(private httpService: HttpService, private router: Router, private analyticsService: AnalyticsService) {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      const accessTokenObject = JSON.parse(accessToken);
      this.doc = accessTokenObject._doc;
    }
  }

  ngOnInit() {
    this.analyticsService.trackEvent('page_view', 'Create post page viewed', 'CREATE_POST_PAGE');
  }

  createPost() {
    this.httpService.createPost(this.title, this.content, this.doc._id).subscribe((data: any) => {
      console.log(data);
      this.router.navigate(['/home']);
    });
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  home() {
    this.router.navigate(['/home']);
  }

}


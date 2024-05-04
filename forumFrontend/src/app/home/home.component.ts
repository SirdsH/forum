import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../http.service';
import {AnalyticsService} from "../analytics.service";


interface Post {
  id: number;
  title: string;
  content: string;
  author: {
    username: string;
  };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  posts: any;
  search: string = '';


  constructor(private router: Router, private httpService: HttpService, private analyticsService: AnalyticsService) { }

  ngOnInit() {
    this.httpService.getPosts().subscribe((data: any) => {
      this.posts = data;
    });
    this.analyticsService.trackEvent('page_view', 'Home page viewed', 'HOME_PAGE');
  }

  logout() {
    sessionStorage.removeItem('access_token');
    this.router.navigate(['/login']);
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  createPost() {
    this.router.navigate(['/create-post']);
  }

  filterPosts() {
    return this.posts
      .filter((post: Post) => {
        if (!post) {
          return false;
        }
        return post.title.toLowerCase().includes(this.search.toLowerCase()) || post.content.toLowerCase().includes(this.search.toLowerCase());
      })
      .sort((a: any, b: any) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      })
      .slice(0, 10);
  }

  moveToPost(id: number) {
    this.router.navigate([`/post/${id}`]);
  }


}

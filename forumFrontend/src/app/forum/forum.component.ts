import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  posts: any[] = [];

  constructor(private httpService: HttpService) {
  }

  ngOnInit(): void {
    this.getPosts();
  }

  getPosts() {
    this.httpService.getPosts().subscribe((posts: any) => {
      this.posts = posts;
    });
  }
}

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

  createPost(post: any) {
    this.httpService.createPost(post).subscribe((response: any) => {
      console.log('Request:', serialize(this.httpService.getLastRequest(), replacer, 2));
    });
  }
}

function serialize(obj: any, replacer?: (key: string, value: any) => any, space?: string | number): string {
  const seen = new WeakSet();

  return JSON.stringify(obj, (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) {
        return;
      }
      seen.add(value);
    }
    return replacer ? replacer(key, value) : value;
  }, space);
}

function replacer(key: string, value: any): any {
  if (typeof value === 'object' && value !== null) {
    return value;
  }
  return value;
}

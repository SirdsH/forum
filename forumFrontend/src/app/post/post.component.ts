import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit{
  postId: string = '';
  post: any;
  doc: any;
  comments: any;
  content: string = '';

  constructor(private router: Router, private httpService: HttpService, private route: ActivatedRoute) {
  }


  ngOnInit() {
    const accessToken = sessionStorage.getItem('access_token');
    if (accessToken) {
      const accessTokenObject = JSON.parse(accessToken);
      this.doc = accessTokenObject._doc;
    }

    this.route.params.subscribe((params) => {
      this.postId = params['id'];
      this.httpService.getPost(this.postId).subscribe((response: any) => {
        this.post = response;
      });
    });

    this.httpService.getComments(this.postId).subscribe((response: any) => {
      this.comments = response;
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

  deletePost(id: string) {
    this.httpService.deletePost(id = this.postId).subscribe(() => {
      this.router.navigate(['/home']);
    });
  }

  // This is the function that creates a comment on a post without navigating to a new page and refreshes the page.
  createComment(content: string) {
    this.httpService.createComment(this.postId, this.content = content, this.doc._id).subscribe(() => {
      this.ngOnInit();
    });
  }

  // This is the function that deletes a comment on a post without navigating to a new page.
  deleteComment(commentId: string) {
    this.httpService.deleteComment(this.postId, commentId).subscribe(() => {
      console.log(commentId)
      this.ngOnInit();
    });
  }

}

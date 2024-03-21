import {Component, OnInit} from '@angular/core';
import {HttpService} from "../http.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent {
  title: string = '';
  content: string = '';
  createPostForm: FormGroup;

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder
  ) {
    this.createPostForm = this.fb.group({
      title: ['', Validators.required],content: ['', Validators.required],
    });
  }

  createPost() {
    this.httpService.createPost(this.createPostForm.value.title, this.createPostForm.value.content).subscribe(
      (response) => {
        console.log('Post created successfully:', response);
        console.log(response)
        // You can show a success message or navigate to the post page
      },
      (error) => {
        console.error('Error creating post:', error);
        // You can show an error message or retry the request
      }
    );
  }
}

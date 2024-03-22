import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http: HttpClient) {}

  private url = 'http://localhost:3000/';

  login(username: string, password: string) {
    const credentials = { username, password};
    return this.http.post(`${this.url}auth/login`, credentials);
  }

  register(email: string, username: string, password: string) {
    const credentials = { email, username, password };
    return this.http.post(`${this.url}auth/register`, credentials);
  }




  isLoggedIn() {
    return this.http.get(`${this.url}auth/isLoggedIn`);
  }

  createPost(title: string, content: string, author: string) {
    const post = { title, content, author };
    return this.http.post(`${this.url}post/create`, post);
  }

  getPosts() {
    return this.http.get(`${this.url}post`);
  }

  deletePost(id: string) {
    return this.http.post(`${this.url}post/delete/${id}`, {});
  }

  updatePost(id: string, title: string, content: string) {
    const post = { title, content };
    return this.http.post(`${this.url}post/update/${id}`, post);
  }

  getPost(id: string) {
    return this.http.get(`${this.url}post/${id}`);
  }

  createComment(postId: string, content: string, author: string) {
    const comment = { content, author };
    return this.http.post(`${this.url}posts/${postId}/comments/create`, comment);
  }

  deleteComment(postId: string, commentId: string) {
    return this.http.delete(`${this.url}posts/${postId}/comments/${commentId}`);
  }

  getComments(postId: string) {
    return this.http.get(`${this.url}posts/${postId}/comments`);
  }

  getPostsByUser(userId: string) {
    return this.http.get(`${this.url}post/user/${userId}`);
  }

}

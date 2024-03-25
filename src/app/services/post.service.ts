import { Injectable } from '@angular/core';
import { Post } from '../models/post';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }


  getPosts() {
    return this.http.get<Post[]>('http://localhost:3000/post');
  }

  postPosts(newPost : Post) {
    return this.http.post('http://localhost:3000/post', newPost);
  }
  
  updatePost(editPost : Post ) {
    return this.http.put('http://localhost:3000/post/'+ editPost._id, editPost);
  }
}

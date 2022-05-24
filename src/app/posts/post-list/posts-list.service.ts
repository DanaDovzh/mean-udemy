import { Injectable } from "@angular/core";
import { Post } from "src/app/models/post.model";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  constructor(private http: HttpClient){}

  private posts: Post[] = [{
    title: 'fff',
    content:'dffff'
  }];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return this.http.get<{message: string, posts: Post[]}>('http://localhost:3000/api/posts');
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost({title, content}: Post) {
    const post: Post = { title, content };
    return this.http.post<{message: string}>('http://localhost:3000/api/post', post);
  }

  deletePost(id: string) {
    return this.http.delete(`http://localhost:3000/api/posts/${id}`)
  }
}

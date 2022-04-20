import { Component, OnInit } from "@angular/core";
import { Subscription } from "rxjs";
import { Post } from "src/app/models/post.model";
import { PostsService } from "./posts-list.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.sass']
})
export class PostsListComponent implements OnInit{
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(private postsService: PostsService) {}
  ngOnInit() {
    this.postsService.getPosts();
    this.postsSub = this.postsService.getPostUpdateListener()
      .subscribe((posts: Post[]) => {
        this.posts = posts;
      });
    console.log(12, this.posts, this.postsService.getPosts());
  }
}

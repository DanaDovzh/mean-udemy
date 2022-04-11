import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/models/post.model";

@Component({
  selector: 'app-post-create',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.sass']
})
export class PostsListComponent implements OnInit{
  posts: Post[] = [];
  ngOnInit() {
    console.log(12);
  }
}

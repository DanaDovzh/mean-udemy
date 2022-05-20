import { Component, OnInit } from "@angular/core";
import { Subscription, switchMap } from "rxjs";
import { Post } from "src/app/models/post.model";
import { PostsService } from "./posts-list.service";
import {MatDialog} from '@angular/material/dialog';
import { PostCreateComponent } from "../post-create/post-create.component";

@Component({
  selector: 'app-post-create',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.sass']
})
export class PostsListComponent implements OnInit{
  posts: Post[] = [];
  private postsSub: Subscription;

  constructor(private postsService: PostsService, public dialog: MatDialog) {}
  ngOnInit() {
    this.postsService.getPosts().subscribe(data => {
      this.posts = data.posts;
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      autoFocus: false,
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
    });
  }

  deletePost(id) {
    this.postsService.deletePost(id)
      .pipe(
        switchMap(() => this.postsService.getPosts()),
        // takeUntil(this.destroy$)
      )
    .subscribe((data) => {
      console.log(data
        );

    });
  }
}

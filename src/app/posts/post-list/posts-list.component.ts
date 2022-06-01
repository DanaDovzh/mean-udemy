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
  isLoading: Boolean = false;

  constructor(private postsService: PostsService, public dialog: MatDialog) {}
  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
    this.isLoading = true;
    this.postsService.getPosts().subscribe(data => {
      this.posts = data.posts;
      this.isLoading = false;
    });
  }
  openDialog() {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        mode: 'create'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
    });
  }

  editPost(post) {
    const dialogRef = this.dialog.open(PostCreateComponent, {
      autoFocus: false,
      disableClose: true,
      data: {
        mode: 'edit',
        dataPost: post
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getPosts();
    });
  }

  deletePost(id) {
    this.postsService.deletePost(id)
      .pipe(
        switchMap(() => this.postsService.getPosts()),
        // takeUntil(this.destroy$)
      )
    .subscribe((data) => {
      this.posts = data.posts;

    });
  }
}

import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Post } from "src/app/models/post.model";
import { PostsService } from "../post-list/posts-list.service";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass']
})
export class PostCreateComponent implements OnInit {
  postText = '';
  filtersForm: FormGroup;
  newPostForm: FormGroup;
  mode: string = 'create';
  response = false;
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, dataPost?:Post},
    public dialogRef: MatDialogRef<PostCreateComponent>){

  }
  ngOnInit(): void {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    console.log(23, this.data)

    if(this.data.mode === 'edit') {
      this.newPostForm.patchValue({
        title: this.data.dataPost.title,
        content: this.data.dataPost.content
      })
    }
  }

  getError(data){
    // console.log(data, this.newPost.controls.title.getError('required')  )
  }
  addNewPost(): void {
    console.log(this.dialogRef);

    if(this.newPostForm.invalid) {
      return;
    }
    this.postsService.addPost(this.newPostForm.value).subscribe(() => {
      this.dialogRef.close();
    });
    this.newPostForm.reset()
    this.newPostForm.markAllAsTouched()

    console.log(2, this.newPostForm)
  }
}

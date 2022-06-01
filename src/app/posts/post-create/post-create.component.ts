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
  imagePreview;
  constructor(
    private fb: FormBuilder,
    private postsService: PostsService,
    @Inject(MAT_DIALOG_DATA) public data: {mode: string, dataPost?:Post},
    public dialogRef: MatDialogRef<PostCreateComponent>){

  }
  ngOnInit(): void {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(5)]],
      image: null
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

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(file);
  }

  save(): void {
    if(this.newPostForm.invalid) {
      return;
    }

    if(this.data.mode === 'create'){
      this.postsService.addPost(this.newPostForm.value).subscribe(() => {
        this.dialogRef.close();
      });
    } else {
      console.log('edit');

      this.postsService.updatePost(this.data.dataPost['_id'], this.newPostForm.value)
      .subscribe((data) => {
        console.log(data);

        this.dialogRef.close()
      })
    }
    this.newPostForm.reset()
    this.newPostForm.markAllAsTouched()
  }
}

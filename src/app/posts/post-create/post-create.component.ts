import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
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

  constructor(
    private fb: FormBuilder,
    private postsService: PostsService){

  }
  ngOnInit(): void {
    this.newPostForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', [Validators.required, Validators.minLength(5)]]
    });
    console.log(23, this.newPostForm)
  }

  getError(data){
    // console.log(data, this.newPost.controls.title.getError('required')  )
  }
  addNewPost(): void {
    if(this.newPostForm.invalid) {
      return;
    }
    this.postsService.addPost(this.newPostForm.value);
    this.newPostForm.reset()
    this.newPostForm.markAllAsTouched()

    console.log(2, this.newPostForm)
  }
}

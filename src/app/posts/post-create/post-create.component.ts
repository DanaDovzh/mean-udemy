import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.sass']
})
export class PostCreateComponent implements OnInit {
  postText = '';
  filtersForm: FormGroup;
  newPost: FormGroup;

  constructor(private fb: FormBuilder){

  }
  ngOnInit(): void {
    this.newPost = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required, Validators.minLength(5)]
    });
  }
  addNewPost(postInp?: HTMLTextAreaElement): void {
    console.log(this.postText)
  }
}

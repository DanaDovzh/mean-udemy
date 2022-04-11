import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PostCreateComponent } from './posts/post-create/post-create.component';
import { HeaderComponent } from './header/header.component';
import { AppComponent } from './app.component';
import { PostsListComponent } from './posts/post-list/posts-list.component';

const routes: Routes = [
  { path: '', component: PostsListComponent },
  { path: 'posts', component: PostsListComponent},
  { path: 'create-post', component: PostCreateComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }

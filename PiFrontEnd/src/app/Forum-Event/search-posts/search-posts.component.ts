import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-search-posts',
  templateUrl: './search-posts.component.html',
  styleUrls: ['./search-posts.component.css']
})
export class SearchPostsComponent  implements OnInit {
  word:any;
  posts: any;
  post:any;
  editPostForm!: FormGroup;

  constructor( private postService: PostService,
    private route: ActivatedRoute, private fb: FormBuilder){}


  ngOnInit(): void {
    this.word = this.route.snapshot.params['word'];
    this.SearchPosts();
    this.editPostForm = this.fb.group({
      topic: [this.post.topic, Validators.required],
      contenu: [this.post.contenu, Validators.required],
    });
  }

  SearchPosts(){
    this.postService.SearchPosts(this.word).subscribe(
      (data) => {
        this.posts = data;
        console.log(this.posts);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getPost(post: any) {
    this.post = post;
    this.editPostForm = this.fb.group({
      topic: [this.post.topic, Validators.required],
      contenu: [this.post.contenu, Validators.required],
    });
  }

  deletePost() {
    this.postService.deletePost(this.post.id).subscribe(
      (response: any) => {
        // Reload the users list after successful deletion
        this.ngOnInit();
      },
      (error) => {
        console.log(error);
      }
    );

  }

}
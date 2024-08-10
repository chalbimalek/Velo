import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-add-posts',
  templateUrl: './add-posts.component.html',
  styleUrls: ['./add-posts.component.css']
})
export class AddPostsComponent  implements OnInit {

  addPostForm!: FormGroup ;
  posts: any;


  constructor(private router: Router,
    private fb: FormBuilder,private postService:PostService){}


  ngOnInit(): void {
    this.addPostForm = this.fb.group({
      topic: ['',Validators.required],
      contenu: ['',Validators.required],
     
    });
  }


  addPost() {
    const postData = this.addPostForm.value;
    console.log('value', postData);

    this.postService.addPost(postData).subscribe(
      (response) => {
        console.log('Response:', response);
        this.navigateToPostsList();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  navigateToPostsList() {
    this.router.navigate(['/posts']);
  }

}
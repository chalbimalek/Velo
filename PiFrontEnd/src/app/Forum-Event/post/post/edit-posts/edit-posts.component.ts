import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-edit-posts',
  templateUrl: './edit-posts.component.html',
  styleUrls: ['./edit-posts.component.css']
})
export class EditPostsComponent  implements OnInit {

  editPostForm!: FormGroup;
  post: any = { topic: '', contenu: '' }; 
  posts :any ;

  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,private fb: FormBuilder,private postService: PostService){}


  ngOnInit(): void {
    this.editPostForm = this.fb.group({
      topic: [this.post.topic, Validators.required],
      contenu: [this.post.contenu, Validators.required],
     
    });
    this.getPost(this.activatedRoute.snapshot.params['id']);
    
  }
  

  updatePost() {
    const postData = this.editPostForm.value;
    console.log('value', postData);
    const id = this.post.id;

    this.postService.updatePost(id, postData).subscribe(
      (response) => {
        console.log(response);
        this.navigateToEmployeList();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  navigateToEmployeList() {
    this.router.navigate(['/posts']);
  }


  getPost(id: any) {
    this.postService.getPostById(id).subscribe((res: any) => {
      this.post = res;
      console.log(res);
      

      this.editPostForm.patchValue({
        topic: this.post.topic,
        contenu: this.post.contenu
      });
  
    });

}
}

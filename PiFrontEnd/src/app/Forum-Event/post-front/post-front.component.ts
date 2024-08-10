import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { PostService } from 'src/app/Service/post.service';

@Component({
  selector: 'app-post-front',
  templateUrl: './post-front.component.html',
  styleUrls: ['./post-front.component.css']
})
export class PostFrontComponent implements OnInit {
  post:any ;
  posts :any ;
  editPostForm!: FormGroup;
  deletePostForm!: FormGroup;
  fileUrl:any ;

  constructor(private postService: PostService,
    
    private fb: FormBuilder,
    private router: Router,private sanitizer: DomSanitizer){}

    ngOnInit(): void {
      this.getPosts();
    }

    
    getPosts() {
      this.postService.getPosts().subscribe(
        (data) => {
          this.posts = data;
          this.posts.map((post:any)=>{
            this.postService.retrieveFile(post.id).subscribe(blob=>{
        
              post.fileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
            
           
          });
          })
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
          this.getPosts();
        },
        (error) => {
          console.log(error);
        }
      );
  
    }


    retrieveFile(id:any){
      this.postService.retrieveFile(id).subscribe(blob=>{
        
          this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
        
       
        window.open(this.fileUrl.changingThisBreaksApplicationSecurity);
      });
  
  
    }
  
    retrieveImage(id: any): any {
      return this.postService.retrieveFile(id).pipe(
        map(blob => this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob)))
      );
    }
  
    search(searchTerm: string) {
      this.router.navigate(['/post/SearchPosts',searchTerm]);
    }
  

  
}




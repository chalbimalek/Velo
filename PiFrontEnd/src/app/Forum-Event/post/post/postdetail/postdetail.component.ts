
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PostService } from 'src/app/Service/post.service';
@Component({
  selector: 'app-postdetail',
  templateUrl: './postdetail.component.html',
  styleUrls: ['./postdetail.component.css']
})
export class PostdetailComponent implements OnInit{
  post:any;
  posts:any;
  idposts:any;
  editPostForm: any;
  fb: any;
  constructor(private route: ActivatedRoute,
    private postservice:PostService
  ){}

  ngOnInit(): void {
    this.idposts = this.route.snapshot.params['id'];
    console.log(this.idposts);
    this.getPost(this.idposts);
  }


  getPost(id: any) {
    this.postservice.getPostById(id).subscribe((res: any) => {
      this.post = res;
      console.log(res);
      

      this.editPostForm.patchValue({
        topic: this.post.topic,
        contenu: this.post.contenu
      });
  
    });

}
 
  
    

}





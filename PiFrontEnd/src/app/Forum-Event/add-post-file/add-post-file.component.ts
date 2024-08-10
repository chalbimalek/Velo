import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { PostService } from 'src/app/Service/post.service';
import * as saveAs from 'file-saver';


@Component({
  selector: 'app-add-post-file',
  templateUrl: './add-post-file.component.html',
  styleUrls: ['./add-post-file.component.css']
})
export class AddPostFileComponent  implements OnInit {

  id: any;

  file!: File;

  filename!: string;
  fileStatus = { status: '', requestType: '', percent: 0 };

  document: any;
  showForm: boolean = false;

  constructor( private activated: ActivatedRoute,
    private router: Router, private postService: PostService){}


  ngOnInit(): void {
    this.activated.paramMap.subscribe((params) => {
      this.id = params.get('id');
    });
  }


  onChangeFiles(event: any): void {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  uploadFiles() {
    const formData = new FormData();

    formData.append('file', this.file, this.file.name);

    this.postService.addFile(formData, this.id).subscribe(
      (event: any) => {
        console.log('Jibhaa', event.body);
        this.resportProgress(event);
        console.log('this.fileStatus.status ', this.fileStatus.status);
        if (this.fileStatus.status == 'done') {
          // this.router.navigate(["/layouts/folders/folderList/subFolder/" + this.folderId]);
          console.log('done123');
          this.navigateToPostsList();
        }
      },
      (error: HttpErrorResponse) => {
        console.log(error);
      }
    );
  }

  private resportProgress(httpEvent: HttpEvent<string[] | Blob | any>): void {
    switch (httpEvent.type) {
      case HttpEventType.UploadProgress:
        this.updateStatus(httpEvent.loaded, httpEvent.total!, 'Uploading... ');
        break;
      case HttpEventType.ResponseHeader:
        console.log('Header returned', httpEvent);
        break;
      case HttpEventType.Response:
        if (httpEvent.body instanceof Array) {
          console.log('aaaaa');

          this.fileStatus.status = 'done';
        } else if (httpEvent.body instanceof Blob) {
          const contentType = httpEvent.headers.get('Content-Type');
          if (contentType === 'application/json') {
            console.log('invalid file type');
          } else {
            saveAs(
              new File([httpEvent.body!], httpEvent.headers.get('File-Name')!, {
                type: `${contentType};charset=utf-8`,
              })
            );
          }
        }
        console.log('aaaaa2');
        this.fileStatus.status = 'done';
        break;
      default:
        console.log(httpEvent);
        break;
    }
  }

  private updateStatus(
    loaded: number,
    total: number,
    requestType: string
  ): void {
    this.fileStatus.status = 'progress';
    this.fileStatus.requestType = requestType;
    this.fileStatus.percent = Math.round((100 * loaded) / total);
  }

  navigateToPostsList() {
    this.router.navigate(['/posts']);
  }
}



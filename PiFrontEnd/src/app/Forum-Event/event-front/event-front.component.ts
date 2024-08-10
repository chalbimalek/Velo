import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { map } from 'rxjs';
import { EventService } from 'src/app/Service/event.service';
import { PostService } from 'src/app/Service/post.service';
@Component({
  selector: 'app-event-front',
  templateUrl: './event-front.component.html',
  styleUrls: ['./event-front.component.css']
})
export class EventFrontComponent {
  id: any;
  fileUrl:any ;
  file!: File;

  filename!: string;
  fileStatus = { status: '', requestType: '', percent: 0 };

  document: any;
  showForm: boolean = false;

 event:any ;
  events :any ;
  editEventForm!: FormGroup;
  deleteEventForm!: FormGroup;
  constructor(private eventservice:EventService,private sanitizer: DomSanitizer,
    
    private fb: FormBuilder,
    private router: Router){}

    ngOnInit(): void {
    this.getEvents();
   
    }
  



    getEvents() {
      this.eventservice.getevnts().subscribe(
        (data) => {
          this.events = data;
          console.log(this.events);
          this.events.map((post:any)=>{
            this.eventservice.retrieveFile(post.id).subscribe(blob=>{
        
              post.fileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
            
           
            });
          })
          console.log(this.events);
        },
        (error) => {
          console.log(error);
        }
      );
    }
    navigateToEventDetail(eventId: number) {
      this.router.navigate(['/detailEventFront', eventId]);
    }
    getEvent(event: any) {
      this.event = event;
      this.editEventForm= this.fb.group({
        topic: [this.event.topic, Validators.required],
        endDate: [this.event.endDate, Validators.required],
        startDate: [this.event.startDate, Validators.required],
        location_event: [this.event.location_event, Validators.required],
      });
    }
    retrieveFile(id:any){
      this.eventservice.retrieveFile(id).subscribe(blob=>{
        
          this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
        
       
        window.open(this.fileUrl.changingThisBreaksApplicationSecurity);
      });
  
  
    }
  
    retrieveImage(id: any): any {
      return this.eventservice.retrieveFile(id).pipe(
        map(blob => this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob)))
      );
    }
    deleteEvent() {
      this.eventservice.deletevent(this.event.id).subscribe(
        (response: any) => {
          // Reload the users list after successful deletion
          this.getEvents();
        },
        (error) => {
          console.log(error);
        }
      );
  
    }
    onChangeFiles(event: any): void {
      this.file = event.target.files[0];
      console.log(this.file);
    }
  
    uploadFiles() {
      const formData = new FormData();
  
      formData.append('file', this.file, this.file.name);
  
      this.eventservice.addFile(formData, this.id).subscribe(
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
      this.router.navigate(['/Events']);
    }

    getImageUrl(fileName: string): string {
      // Assuming images are stored in a specific directory or have a predictable URL structure
      // You need to construct the complete URL based on your application's image storage setup
      return `assets/images/${fileName}`;
    }
  
    formatDate(timestamp: number): string {
      // Implement date formatting based on your requirements
      // Example formatting using JavaScript Date object:
      const date = new Date(timestamp);
      return date.toLocaleDateString(); // Customize date formatting as needed
    }
}

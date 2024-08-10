import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as saveAs from 'file-saver';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventsComponent implements OnInit {
  addEventForm!: FormGroup ;
  events: any;
  id: any;

  file!: File;

  filename!: string;
  fileStatus = { status: '', requestType: '', percent: 0 };

  document: any;
  showForm: boolean = false;

  constructor(private router: Router,
    private fb: FormBuilder,private eventservice:EventService){}


  ngOnInit(): void {
    this.addEventForm= this.fb.group({
      topic: ['', Validators.required],
      endDate: ['', Validators.required],
      startDate: ['', Validators.required],
      location_event: ['', Validators.required],
    });
  }

  addEvent() {
    const eventData = this.addEventForm.value;
    console.log('value', eventData);

    this.eventservice.addevent(eventData).subscribe(
      (response) => {
        console.log('Response:', response);
        const newEventId = response.id; // Assuming the response contains the new event's ID
        this.navigateToEventDetail(newEventId);      },
      (error) => {
        console.error(error);
      }
    );
  }
  navigateToEventsList() {
    this.router.navigate(['/events']);
  }
  onChangeFiles(event: any): void {
    this.file = event.target.files[0];
    console.log(this.file);
  }

  uploadFiles() {
    const formData = new FormData();

    formData.append('file', this.file, this.file.name);

    this.eventservice.addFile(formData, this.events).subscribe(
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
  navigateToEventDetail(eventId: number) {
    this.router.navigate(['/detailEvent', eventId]);
  }

  // Example usage when calling this method, assuming 'event' is defined in the component
  navigateToEventDetailOnClick() {
    if (this.events && this.events.id) {
      this.navigateToEventDetail(this.events.id);
    } else {
      console.error('Event ID is missing or invalid.');
      // Handle error or notify user that event ID is missing
    }
  }
}

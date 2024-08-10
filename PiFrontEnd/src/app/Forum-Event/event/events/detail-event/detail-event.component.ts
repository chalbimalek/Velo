import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as saveAs from 'file-saver';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-detail-event',
  templateUrl: './detail-event.component.html',
  styleUrls: ['./detail-event.component.css']
})
export class DetailEventsComponent implements OnInit {
  event: any ;
  events :any ;
  idEvent : any ;
  file!: File;

  filename!: string;
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private route: ActivatedRoute,
    private eventservice:EventService
  ){}


  ngOnInit(): void {
    this.idEvent = this.route.snapshot.params['id'];
    console.log(this.idEvent);
    this.getEvent(this.idEvent);
  }


  getEvent(id: any) {
    this.eventservice.getEventById(id).subscribe((res: any) => {
      this.event = res;
      console.log(res);
      
      const startDate = new Date(this.event.startDate);
    const endDate = new Date(this.event.endDate);

    // Formater les dates au format "yyyy-MM-dd"
    const startDateFormatted = startDate.toISOString().split('T')[0];
    const endDateFormatted = endDate.toISOString().split('T')[0];

   
  
    });

}
onChangeFiles(event: any): void {
  this.file = event.target.files[0];
  console.log(this.file);
}

uploadFiles() {
  const formData = new FormData();

  formData.append('file', this.file, this.file.name);

  this.eventservice.addFile(formData, this.idEvent).subscribe(
    (event: any) => {
      console.log('Jibhaa', event.body);
      this.resportProgress(event);
      console.log('this.fileStatus.status ', this.fileStatus.status);
      if (this.fileStatus.status == 'done') {
        // this.router.navigate(["/layouts/folders/folderList/subFolder/" + this.folderId]);
        console.log('done123');
        //this.navigateToPostsList();
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


}



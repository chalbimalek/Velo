import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-event-front-details',
  templateUrl: './event-front-details.component.html',
  styleUrls: ['./event-front-details.component.css']
})
export class EventFrontDetailsComponent implements OnInit {
  event: any ;
  events :any ;
  idEvent : any ;
  file!: File;

  filename!: string;
  fileStatus = { status: '', requestType: '', percent: 0 };

  constructor(private route: ActivatedRoute,
    private eventservice:EventService,private sanitizer: DomSanitizer
  ){}


  ngOnInit(): void {
    this.idEvent = this.route.snapshot.params['id'];
    console.log(this.idEvent);
    this.getEvent(this.idEvent);
  }


  getEvent(id: any): void {
    this.eventservice.getEventById(id).subscribe(
      (res: any) => {
        // Traiter la réponse en fonction du type de données attendu
        if (Array.isArray(res)) {
          // Si res est un tableau d'événements
          this.event = res.map((event: any) => {
            this.retrieveFile(event.id); // Récupérer le fichier pour chaque événement
            return {
              ...event,
              startDateFormatted: new Date(event.startDate).toISOString().split('T')[0],
              endDateFormatted: new Date(event.endDate).toISOString().split('T')[0]
            };
          });
        } else {
          // Si res est un seul événement
          this.event = {
            ...res,
            startDateFormatted: new Date(res.startDate).toISOString().split('T')[0],
            endDateFormatted: new Date(res.endDate).toISOString().split('T')[0]
          };
          this.retrieveFile(res.id); // Récupérer le fichier pour cet événement
        }
      },
      (error) => {
        console.log('Error:', error);
      }
    );
  }
  fileUrl: SafeUrl | undefined;

  retrieveFile(id: any): void {
    this.eventservice.retrieveFile(id).subscribe(
      (blob) => {
        this.fileUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
      },
      (error) => {
        console.log('Error retrieving file:', error);
      }
    );
  }

retrieveImage(id: any): any {
  return this.eventservice.retrieveFile(id).pipe(
    map(blob => this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob)))
  );
}

}

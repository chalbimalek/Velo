import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EventService } from 'src/app/Service/event.service';

@Component({
  selector: 'app-edit-events',
  templateUrl: './edit-events.component.html',
  styleUrls: ['./edit-events.component.css']
})
export class EditEventsComponent implements OnInit {

  editEventForm!: FormGroup;
  event: any ;
  events :any ;
  idEvent : any ;
  
  constructor(private activatedRoute: ActivatedRoute,
    private router:Router,private fb: FormBuilder,private eventservice:EventService){}


  ngOnInit(): void {
    this.editEventForm= this.fb.group({
      topic: ['', Validators.required],
      endDate: [, Validators.required],
      startDate: [, Validators.required],
      location_event: ['', Validators.required],
    });
    this.idEvent = this.activatedRoute.snapshot.params['id'];
    this.getEvent(this.idEvent);

  }

  updateEvent() {
    const eventData = this.editEventForm.value;
    console.log('value', eventData);
    const id = this.idEvent;

    this.eventservice.updateevent(id, eventData).subscribe(
      (response) => {
        console.log(response);
        this.navigateToEventList();
      },
      (error) => {
        console.error(error);
      }
    );
    console.log("this.editEventForm res", this.editEventForm);
    
  }

  navigateToEventList() {
    this.router.navigate(['/events']);
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

    // Créer le formulaire avec les dates formatées
    this.editEventForm = this.fb.group({
      topic: [this.event.topic, Validators.required],
      endDate: [endDateFormatted, Validators.required],
      startDate: [startDateFormatted, Validators.required],
      location_event: [this.event.location_event, Validators.required],
    });

      console.log("this.editEventForm  =>", this.editEventForm);
      
     /* this.editEventForm.patchValue({
        topic: this.event.topic,
        endDate: this.event.endDate,
        startDate: this.event.startDate,
        location_event: this.event.location_event,
      });
  */
    });

}

}
import { Component, OnInit } from '@angular/core';
import { RatingService } from 'src/app/Service/rating.service';
import { Rating } from 'src/app/model/rating';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  eventId: number = 1; // Example event ID
  ratingValue: number = 0; // Example rating value
  ratings: Rating[] = [];
  averageRating: number = 0;
  currentRating: number = 0;

  constructor(private ratingService: RatingService) { }

  ngOnInit(): void {
    this.loadRatings();
    this.loadAverageRating();
    this.loadCurrentRating();
  }

  loadRatings() {
    this.ratingService.getAllRatingsForEvent(this.eventId).subscribe(ratings => {
      this.ratings = ratings;
    });
  }

  loadAverageRating() {
    this.ratingService.getAverageRatingForEvent(this.eventId).subscribe(avgRating => {
      this.averageRating = avgRating;
    });
  }

  loadCurrentRating() {
    this.ratingService.getRatingByEvent(this.eventId).subscribe(currentRating => {
      this.currentRating = currentRating;
    });
  }

  addRating() {
    this.ratingService.addRating(this.eventId, this.ratingValue).subscribe(() => {
      // Reload ratings after adding
      this.loadRatings();
      this.loadAverageRating();
      this.loadCurrentRating();
    });
  }
}

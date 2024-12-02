import { Component, Input } from '@angular/core';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { RatingService } from '../../services/rating.service';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrl: './rating.component.css',
  providers: [NgbRatingConfig]
})
export class RatingComponent {

  @Input() movieId: number = 0;

  constructor(config: NgbRatingConfig, private ratingService: RatingService) {
		// customize default values of ratings used by this component tree
		config.max = 5;
		config.readonly = false;
    //config.resettable = true;
	}

  rateSeries(rate: number) {
    console.log(rate);
    this.ratingService.rateSeries(this.movieId, rate).subscribe(resp => {
      console.log(resp); 
    });
  }



}

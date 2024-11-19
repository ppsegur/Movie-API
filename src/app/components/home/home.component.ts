import { Component, OnInit } from '@angular/core';
import { MovieNew } from '../../models/home.model';
import { Serietvnew } from '../../models/home.model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  standalone: false
})
export class HomeComponent implements OnInit {

  moviesnewsList: MovieNew[] = [];
  seriestvnewList: Serietvnew[] = [];

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getMoviesNews().subscribe((resp) => {
      this.moviesnewsList = resp.results;
    });
    this.homeService.getSeriesNews().subscribe((resp) => {
      this.seriestvnewList = resp.results;
    });
  }

  getStrokeDashoffset(voteAverage: number): number {
    const maxDashArray = 440; 
    const normalizedVote = Math.min(Math.max(voteAverage, 0), 10); 
    return maxDashArray - (normalizedVote / 10) * maxDashArray;
}


getCircleColor(voteAverage: number): string {
  console.log('Vote Average:', voteAverage); 
  if (voteAverage > 8) {
      return 'green';
  } else if (voteAverage >= 5 && voteAverage < 7) {
      return 'orange'; 
  } else if (voteAverage >= 7 && voteAverage < 8) {
      return 'yellow'; 
  } else {
      return 'red';
  }
}

}

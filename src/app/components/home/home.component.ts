import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  moviesnewsList: any[] = []; 
  seriestvnewList: any[] = [];
  searchResults: any[] = [];
  searchQuery: string = ''; 

  constructor(private homeService: HomeService) {}

  ngOnInit(): void {
    this.homeService.getMoviesNews().subscribe((resp) => {
      this.moviesnewsList = resp.results;
    });

    this.homeService.getSeriesNews().subscribe((resp) => {
      this.seriestvnewList = resp.results;
    });
  }

  search(): void {
    if (this.searchQuery.trim() === '') {
      this.searchResults = [];
      return;
    }

    this.homeService
      .searchMoviesAndSeries(this.searchQuery)
      .subscribe(([moviesResp, seriesResp]) => {
        this.searchResults = [
          ...moviesResp.results.map((item: any) => ({
            ...item,
            type: 'movie',
          })),
          ...seriesResp.results.map((item: any) => ({
            ...item,
            type: 'series',
          })),
        ];
      });
  }

  getStrokeDashoffset(voteAverage: number): number {
    const maxDashArray = 440; 
    const normalizedVote = Math.min(Math.max(voteAverage, 0), 10); 
    return maxDashArray - (normalizedVote / 10) * maxDashArray; 
  }

  getCircleColor(voteAverage: number): string {
    if (voteAverage > 8) {
      return 'green'; 
    } else if (voteAverage >= 7) {
      return 'yellow';
    } else if (voteAverage >= 5) {
      return 'orange'; 
    } else {
      return 'red'; 
    }
  }
}

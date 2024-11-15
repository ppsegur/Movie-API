import { Component, OnInit } from '@angular/core';
import { MovieNew } from '../../models/home.model';
import { Serietvnew } from '../../models/home.model';
import { HomeService } from '../../services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
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
}

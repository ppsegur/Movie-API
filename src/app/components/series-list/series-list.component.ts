import { Component, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../../models/series.model';

@Component({
  selector: 'app-series-list',
  templateUrl: './series-list.component.html',
  styleUrl: './series-list.component.css'
})
export class SeriesListComponent implements OnInit {

  constructor(private seriesService: SeriesService) { }
  listadoSeries: Series[] = [];

  ngOnInit(): void {
    this.loadSeriesList();
  }

  loadSeriesList() {
    this.seriesService.getSeries().subscribe(respuesta => {
      this.listadoSeries = respuesta.results;
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

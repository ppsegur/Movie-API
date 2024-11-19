import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Series } from '../../../models/series.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.css'
})
export class SeriesDetailComponent implements OnInit{
  
  constructor(private seriesService: SeriesService, private route: ActivatedRoute) {}

  series!: Series;
  @Input() seriesId: number | undefined;

  ngOnInit(): void {
    this.seriesId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSeriesDetail(this.seriesId);
  }

  loadSeriesDetail(id: number) {
    this.seriesService.getSeriesById(id).subscribe(respuesta => {
      this.series = respuesta;
    });
  }

}

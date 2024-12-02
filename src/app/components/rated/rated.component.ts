import { Component, OnInit } from '@angular/core';
import { Rating } from 'primeng/rating';
import { RatingService } from '../../services/rating.service';
import { Observable } from 'rxjs';
import { Films } from '../../models/films.interface';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-rated',
  templateUrl: './rated.component.html',
  styleUrl: './rated.component.css'
})
export class RatedComponent implements OnInit{
  
  constructor(private ratedService: RatingService, private http: HttpClient) { }
  
  listadoValorados: Films[] = [];

  ngOnInit(): void {
    //this.listadoValorados = this.ratedService.getValorados();
    /*for(let i = 0; i < this.ratedService.listadoValorados.length; i++) {
      this.listadoValorados.push(this.ratedService.getValorados()[i]);
    }*/

    this.loadValorados();
  }

  loadValorados(): void {
    this.ratedService.getValoradosV2().subscribe((data) => {
      this.listadoValorados = data.results;
    });
  }

  trackById(index: number, item: { id: number | string }): number | string {
    return item.id;
  }

  

}

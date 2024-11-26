import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Season, Series } from '../../../models/series.model';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { Films } from '../../models/films.interface';

@Component({
  selector: 'app-series-detail',
  templateUrl: './series-detail.component.html',
  styleUrl: './series-detail.component.css'
})
export class SeriesDetailComponent implements OnInit{
  
  constructor(private seriesService: SeriesService, private route: ActivatedRoute, private listService: ListService) {}
  film!: Films;
  series!: Series;
  @Input() seriesId: number | undefined;
  temporadas: Season[] = [];
  userLists: any[] = [];
  selectedListId!: number; // ID de la lista seleccionada
  accountId: number = 21623249; // Valor fijo del servicio
  sessionId: string = 'b65a3cfcfa444c674e7b0a6bd82d54197a435693'; // Valor fijo del servicio

  ngOnInit(): void {
    this.seriesId = Number(this.route.snapshot.paramMap.get('id'));
    this.loadSeriesDetail(this.seriesId);
    this.loadUserLists();
  }

  loadSeriesDetail(id: number) {
    this.seriesService.getSeriesById(id).subscribe(respuesta => {
      this.series = respuesta;
    });
  }

  loadUserLists(): void {
    this.listService.getUserLists(this.accountId, this.sessionId).subscribe({
      next: (response) => {
        this.userLists = response.results;
        console.log('Listas del usuario:', this.userLists); // Para depuración
      },
      error: (err) => console.error('Error obteniendo listas:', err),
    });
  }

  getSeasons(): Season[] {
    this.temporadas = this.series.seasons;
    return this.temporadas;
  }

  addToSelectedList(): void {
    if (this.selectedListId && this.seriesId) {
      this.listService.addSeriesToList(this.selectedListId, this.sessionId, this.seriesId).subscribe({
        next: () => {
          console.log(`Serie añadida a la lista`);
          alert('Serie añadida exitosamente a la lista.');
        },
        error: (err) => {
          console.error('Error añadiendo serie a la lista:', err);
          alert('Hubo un error al añadir la serie a la lista.');
        },
      });
    } else {
      alert('Por favor, selecciona una lista.');
    }
  }
  
}

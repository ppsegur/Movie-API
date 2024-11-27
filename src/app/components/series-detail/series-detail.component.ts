import { Component, Input, numberAttribute, OnInit } from '@angular/core';
import { SeriesService } from '../../services/series.service';
import { Season, Series } from '../../../models/series.model';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../services/list.service';
import { Films } from '../../models/films.interface';
import { Film, TvShow } from '../../models/lists.interface';


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
  account_object_id = '6731be6bf0cd1a6bfc0ed946';

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

  // Nueva función para agregar un ítem a la lista seleccionada
  addToList(): void {
    if (!this.selectedListId || !this.series) {
      console.error('No se ha seleccionado una lista o no hay información de la serie.');
      return;
    }

    // Crear el objeto TvShow
    const item: TvShow = {
      id: this.series.id, // El ID de la serie
      media_type: 'tv',
      name: this.series.name,
      poster_path: ''
    };

    // Llamar al servicio para agregar el ítem
    this.listService.addItemToList(item, this.selectedListId).subscribe({
      next: (response) => {
        console.log('Elemento agregado exitosamente:', response);
      },
      error: (err) => {
        console.error('Error al agregar el elemento:', err);
      },
    });
  }
}
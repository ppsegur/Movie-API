import { Component, OnInit } from '@angular/core';
import { FilmsService } from '../../services/films.service';
import { Films } from '../../models/films.interface';

@Component({
  selector: 'app-films-list',
  templateUrl: './films-list.component.html',
  styleUrl: './films-list.component.css'
})
export class FilmsListComponent implements OnInit {

  filmList: Films[] = [];

  constructor(private filmService: FilmsService) {}

  ngOnInit(): void {
    this.filmService.getPopular().subscribe((resp) => {
      this.filmList = resp.results;
    });
  }

}

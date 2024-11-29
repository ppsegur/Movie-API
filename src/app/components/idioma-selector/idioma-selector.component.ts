import { Component, OnInit } from '@angular/core';
import { LenguageService } from '../../services/lenguage.service';

@Component({
  selector: 'app-idioma-selector',
  templateUrl: './idioma-selector.component.html',
  styleUrl: './idioma-selector.component.css'
})
export class IdiomaSelectorComponent implements OnInit {
  idiomas: any[] = [];

  constructor(private idiomaService: LenguageService) {}

  ngOnInit() {
    this.idiomaService.obtenerIdiomas().subscribe((data: any) => {
      this.idiomas = data;
    });
  }

  cambiarIdioma(idioma: string) {
    this.idiomaService.cambiarIdioma(idioma);
    //console.log(`Idioma cambiado a: ${idioma}`);

  }
}



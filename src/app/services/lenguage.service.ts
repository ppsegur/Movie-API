import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LenguageService {
  private apiUrl = 'https://api.themoviedb.org/3/configuration/languages';
  private apiKey = '81819d9750b41c41923effa77112f27a'; // Reemplaza con tu API Key de TMDb
  public idiomaSeleccionado = 'es-ES'; // Idioma por defecto

  constructor(private http: HttpClient) { }
  
  obtenerIdiomas() {
    return this.http.get(`${this.apiUrl}?api_key=${this.apiKey}`);
  }

  cambiarIdioma(nuevoIdioma: string) {
    this.idiomaSeleccionado = nuevoIdioma;
  }
}



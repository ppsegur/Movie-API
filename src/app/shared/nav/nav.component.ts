import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { LenguageService } from '../../services/lenguage.service';
import { Language } from '../../models/languages.interface';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css',
  standalone:false
})
export class NavComponent implements OnInit {
  userName = '';
  userPhoto = '';
  idiomas: Language[]  = [];
  selectedLanguage: string = ''; 

  constructor(private authService: AuthService, private idiomaService: LenguageService) {}

  ngOnInit(): void {
    
      this.userName = localStorage.getItem('user_name') ?? '';
      this.userPhoto = localStorage.getItem('user_photo')
        ? `https://image.tmdb.org/t/p/original${localStorage.getItem(
          'user_photo'
        )}`
        : '';
      this.idiomaService.getLanguages().subscribe(response => {
        this.idiomas = response;
      });
  
      this.selectedLanguage = this.idiomaService.getSelectedLanguage();

  }

  createRequestToken() {
    this.authService.createRequestToken().subscribe((response) => {
      localStorage.setItem('token', response.request_token);

      // STEP 2 de la autenticación en TMDB (firma del token iniciando sesión en TMDB)
      window.location.href = `https://www.themoviedb.org/authenticate/${response.request_token}?redirect_to=http://localhost:4200/approved`;
    });
  }

  isLoggedIn() {
    return localStorage.getItem('logged_in') === 'true';
  }

  logout() {
    localStorage.clear();
    window.location.href = 'http://localhost:4200';
  }

  onLanguageChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const language = selectElement.value;
    this.idiomaService.setSelectedLanguage(language);
    console.log('Selected language:', this.selectedLanguage);
    window.location.reload();
  }
}
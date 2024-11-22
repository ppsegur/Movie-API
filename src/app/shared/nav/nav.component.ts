import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  userName = '';
  userPhoto = '';

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    this.userName = localStorage.getItem('user_name') ?? '';
    this.userPhoto = localStorage.getItem('user_photo')
      ? `https://image.tmdb.org/t/p/original${localStorage.getItem('user_photo')}`
      : '';

    // Agrega los console.log aquí para verificar los datos
    console.log(localStorage.getItem('user_name'));
    console.log(localStorage.getItem('user_photo'));
  }

  createRequestToken() {
    this.authService.createRequestToken().subscribe((response) => {
      localStorage.setItem('token', response.request_token);
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
}
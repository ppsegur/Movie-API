import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';

const routes: Routes = [
  { path: 'filmList', component: FilmsListComponent },
  { path: 'film-detail/:id', component: FilmDetailComponent }, 
  { path: '', redirectTo: '/filmList', pathMatch: 'full' },   
  { path: '**', redirectTo: '/filmList' }                     
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

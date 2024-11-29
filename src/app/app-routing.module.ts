import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';


import { SeriesListComponent } from './components/series-list/series-list.component';
import { SeriesDetailComponent } from './components/series-detail/series-detail.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterItemComponent } from './components/character-item/character-item.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { FavlistComponent } from './components/favlist/favlist.component';
import { WatchListComponent } from './components/watch-list/watch-list.component';


const routes: Routes = [
  { path: 'filmList', component: FilmsListComponent },
  { path: 'film-detail/:id', component: FilmDetailComponent },
  { path: 'characters/character-detail/:id', component: CharacterDetailComponent },
  { path: 'character-item/:id', component: CharacterItemComponent },
  { path: 'characters', component: CharacterListComponent },
  { path: 'seriesList', component: SeriesListComponent },
  { path: 'seriesDetail/:id', component: SeriesDetailComponent },
  { path: 'approved', component: ApprovedComponent },
  {path: 'favorite', component: FavlistComponent},
  {path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },   
  { path: 'watchlist', component: WatchListComponent },
  { path: '**', redirectTo: '/home' }            
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
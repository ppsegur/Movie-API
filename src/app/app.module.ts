import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { HomeComponent } from './components/home/home.component';
import { provideHttpClient } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { AppComponent } from './app.component';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NumberFormatPipePipe } from './pipes/number-format-pipe.pipe';
import { SeriesDetailComponent } from './components/series-detail/series-detail.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterItemComponent } from './components/character-item/character-item.component';
import { ApprovedComponent } from './components/approved/approved.component';
import { FavlistComponent } from './components/favlist/favlist.component';

@NgModule({
  declarations: [

    AppComponent,
    HomeComponent,
    NavComponent,
    NumberFormatPipePipe,
    SeriesListComponent,
    SeriesDetailComponent,
    FilmsListComponent,
    FilmDetailComponent,
    SafeUrlPipe,
    CharacterListComponent,
    CharacterDetailComponent,
    CharacterItemComponent,
    ApprovedComponent,
    FavlistComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [
    provideAnimationsAsync(),
    provideHttpClient()
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }

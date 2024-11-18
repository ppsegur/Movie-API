import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FilmsListComponent } from './components/films-list/films-list.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient } from '@angular/common/http';
import { NumberFormatPipePipe } from './pipes/number-format-pipe.pipe';
import { NavComponent } from './shared/nav/nav.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FilmDetailComponent } from './components/film-detail/film-detail.component';
import { SafeUrlPipe } from './pipes/safe-url.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilmsListComponent,
    NumberFormatPipePipe,
    NavComponent,
    FilmDetailComponent,
    SafeUrlPipe
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

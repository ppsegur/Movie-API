import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { provideHttpClient } from '@angular/common/http';
import { NavComponent } from './shared/nav/nav.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';

@NgModule({
  declarations: [
    CharacterListComponent,
    NavComponent,
    AppComponent,
    CharacterDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }

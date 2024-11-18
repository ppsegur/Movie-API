import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharacterListComponent } from './components/character-list/character-list.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { CharacterItemComponent } from './components/character-item/character-item.component';

const routes: Routes = [
  {path: 'characters/character-detail/:id', component: CharacterDetailComponent},
  {path: 'character-item/:id', component: CharacterItemComponent},
  {path: 'characters', component: CharacterListComponent},
  {path: '', redirectTo: '/characters', pathMatch: 'full'},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

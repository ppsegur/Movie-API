import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FilmsListComponent } from './components/films-list/films-list.component';

const routes: Routes = [
  {path: 'filmList', component: FilmsListComponent},
  {path: '', redirectTo: '/filmList', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

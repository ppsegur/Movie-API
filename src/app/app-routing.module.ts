import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SeriesListComponent } from './components/series-list/series-list.component';
import { SeriesDetailComponent } from './components/series-detail/series-detail.component';

const routes: Routes = [
  {path: 'seriesList', component: SeriesListComponent},
  {path: 'seriesDetail/:id', component: SeriesDetailComponent},
  {path: '', redirectTo: '/seriesList', pathMatch: 'full'},
  {path: '**', redirectTo: '/seriesList'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

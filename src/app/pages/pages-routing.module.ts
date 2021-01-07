import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NotFoundComponent } from './miscellaneous/not-found/not-found.component';
import { RecettesComponent } from './recettes/recettes.component';
import { CommandesComponent } from './commandes/commandes.component';
import { RecetteDetailComponent } from './recettes/recette-detail/recette-detail.component';

const routes: Routes = [{ path: '', component: PagesComponent, children: [
  { path: 'recettes', component: RecettesComponent },
  { path: 'recette-detail', component: RecetteDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'commandes', component: CommandesComponent },
  { path: '', redirectTo: 'recettes', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {
}

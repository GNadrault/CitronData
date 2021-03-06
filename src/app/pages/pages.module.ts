import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { DashboardModule } from './dashboard/dashboard.module';
import { PagesRoutingModule } from './pages-routing.module';
import { ThemeModule } from '../@theme/theme.module';
import { MiscellaneousModule } from './miscellaneous/miscellaneous.module';
import { CommandesComponent } from './commandes/commandes.component';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { RecetteModule } from './recettes/recettes.module';

const PAGES_COMPONENTS = [
  PagesComponent,
];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    RecetteModule,
    MiscellaneousModule,
    Ng2SmartTableModule
  ],
  declarations: [
    ...PAGES_COMPONENTS,
    CommandesComponent,
  ],
})
export class PagesModule {
}

import { NgModule } from '@angular/core';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { ThemeModule } from '../../@theme/theme.module';
import { ChartModule } from 'angular2-chartjs';
import { RecetteCardComponent } from './recette-card/recette-card.component';
import { RecetteDetailComponent } from './recette-detail/recette-detail.component';
import { RecettesComponent } from './recettes.component';

@NgModule({
  imports: [
    ThemeModule,
    ChartModule,
    NgxEchartsModule,
    NgxChartsModule,
    Ng2SearchPipeModule,
    NgxPaginationModule
  ],
  declarations: [
    RecettesComponent,
    RecetteCardComponent,
    RecetteDetailComponent
  ],
  providers: [
  ],
})
export class RecetteModule { }

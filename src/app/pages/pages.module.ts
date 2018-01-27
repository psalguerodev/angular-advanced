import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'

/* ===================[MODULES]====================== */
import { SharedModule } from '../shared/shared.module';

/* ===================[COMPONENTS]====================== */
import { Grapth1Component } from './grapth1/grapth1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

/* ===================[ROUTES]====================== */
import { PAGES_ROUTES } from './pages.route';
import { IncrementComponent } from '../components/increment/increment.component';



@NgModule({
  declarations : [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grapth1Component,
    IncrementComponent
  ],
  exports : [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grapth1Component,
    IncrementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PAGES_ROUTES
  ]
})

export class PagesModule {}

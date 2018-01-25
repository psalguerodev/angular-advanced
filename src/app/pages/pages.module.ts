import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

/* ===================[MODULES]====================== */
import { SharedModule } from '../shared/shared.module';

/* ===================[COMPONENTS]====================== */
import { Grapth1Component } from './grapth1/grapth1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';

/* ===================[ROUTES]====================== */
import { PAGES_ROUTES } from './pages.route';

@NgModule({
  declarations : [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grapth1Component
  ],
  exports : [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Grapth1Component
  ],
  imports: [
    CommonModule,
    SharedModule,
    PAGES_ROUTES
  ]
})

export class PagesModule {}

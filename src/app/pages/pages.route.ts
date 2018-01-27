import { RouterModule , Routes } from '@angular/router';
import { Grapth1Component } from './grapth1/grapth1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AcountsettingsComponent } from './acountsettings/acountsettings.component';

const pagesRoutes : Routes = [
  {
    path: '' ,
    component : PagesComponent ,
    children: [
      { path: 'dashboard' ,    component : DashboardComponent },
      { path: 'progress' ,     component: ProgressComponent },
      { path: 'graphone' ,     component: Grapth1Component },
      { path: 'account-settings' ,     component: AcountsettingsComponent },
      { path : '', redirectTo: '/dashboard' , pathMatch: 'full'},
    ]
  },
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );


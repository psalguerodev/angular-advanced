import { RegisterComponent } from './register/register.component';
import { PagesComponent } from './pages/pages.component';
import { RouterModule , Routes } from '@angular/router';
import { Grapth1Component } from './pages/grapth1/grapth1.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { NofoundComponent } from './shared/nofound/nofound.component';

const appRoutes: Routes = [
  {
    path: '' ,
    component : PagesComponent ,
    children: [
      { path: 'dashboard' ,    component : DashboardComponent },
      { path: 'progress' ,     component: ProgressComponent },
      { path: 'graphOne' ,     component: Grapth1Component },
      { path : '', redirectTo: '/dashboard' , pathMatch: 'full'},
    ]
  },
  { path: 'login',         component: LoginComponent },
  { path: 'register',      component: RegisterComponent },
  { path : '**',           component: NofoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );

import { LoginGuardGuard } from './../services/service.index';
import { RxjsComponent } from './rxjs/rxjs.component';
import { RouterModule , Routes } from '@angular/router';
import { Grapth1Component } from './grapth1/grapth1.component';
import { ProgressComponent } from './progress/progress.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PagesComponent } from './pages.component';
import { AcountsettingsComponent } from './acountsettings/acountsettings.component';
import { PromisesComponent } from './promises/promises.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';

const pagesRoutes : Routes = [
  {
    path: '' ,
    component : PagesComponent ,
    canActivate : [ LoginGuardGuard ],
    children: [
      { path: 'dashboard' ,    component : DashboardComponent , data: { title: 'Dashboard' } },
      { path: 'profile' ,    component : ProfileComponent , data: { title: 'Perfil' } },
      { path: 'progress' ,     component: ProgressComponent  ,  data: { title: 'Progress' } },
      { path: 'graphone' ,     component: Grapth1Component   ,  data: { title: 'Encuestas Gráficas'} } ,
      { path: 'promises' ,     component: PromisesComponent  ,  data: { title: 'Promesas' } },
      { path: 'rxjs' ,         component: RxjsComponent      ,  data: { title: 'Rxjs' } },
      { path: 'account-settings' ,     component: AcountsettingsComponent, data: { title: 'Ajustes de Tema'} },

      //	Rutas personalizadas del Sistema
      { path: 'users' ,     component: UsersComponent, data: { title: 'Mantenimiento de Usuarios'} },

      { path : '', redirectTo: '/dashboard' , pathMatch: 'full'},
    ]
  },
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );


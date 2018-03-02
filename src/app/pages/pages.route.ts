import { VerifytokenGuard } from './../services/guards/verifytoken.guard';
import { AdminGuard } from './../services/guards/admin.guard';
import { DoctorComponent } from './doctor.component';
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
import { HospitalsComponent } from './hospitals/hospitals.component';
import { DoctorsComponent } from './doctors/doctors.component';
import { FinderComponent } from './finder/finder.component';

const pagesRoutes : Routes = [
  { path: 'dashboard' ,
    component : DashboardComponent ,
    canActivate : [ VerifytokenGuard ] ,
    data: { title: 'Dashboard' }
  },
  { path: 'profile' ,    component : ProfileComponent , data: { title: 'Perfil' } },
  { path: 'progress' ,     component: ProgressComponent  ,  data: { title: 'Progress' } },
  { path: 'graphone' ,     component: Grapth1Component   ,  data: { title: 'Encuestas Gráficas'} } ,
  { path: 'promises' ,     component: PromisesComponent  ,  data: { title: 'Promesas' } },
  { path: 'rxjs' ,         component: RxjsComponent      ,  data: { title: 'Rxjs' } },
  { path: 'account-settings' ,     component: AcountsettingsComponent, data: { title: 'Ajustes de Tema'} },
  { path: 'finder/:find' ,     component: FinderComponent, data: { title: 'Buscador de collecciones'} },

  //	Rutas personalizadas del Sistema
  {
    path: 'users' ,
    component: UsersComponent,
    data: { title: 'Mantenimiento de Usuarios'} ,
    canActivate : [AdminGuard]
  },
  { path: 'hospitals' ,     component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales'} },
  { path: 'doctors' ,     component: DoctorsComponent, data: { title: 'Mantenimiento de Doctores'} },
  { path: 'doctor/:id' ,     component: DoctorComponent, data: { title: 'Mantenimiento del Doctor'} },

  { path : '', redirectTo: '/dashboard' , pathMatch: 'full'},
]

export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );

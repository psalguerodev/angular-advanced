import { LoginGuardGuard } from './services/guards/login-guard.guard';
import { RouterModule , Routes } from '@angular/router';
import { PagesComponent } from './pages/pages.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NofoundComponent } from './shared/nofound/nofound.component';

const appRoutes: Routes = [
  { path: 'login',         component: LoginComponent },
  { path: 'register',      component: RegisterComponent },

  //	Lazy Load
  { path : '' ,
    canActivate: [ LoginGuardGuard ],
    component: PagesComponent,
    loadChildren : './pages/pages.module#PagesModule'
  },

  { path : '**',           component: NofoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );

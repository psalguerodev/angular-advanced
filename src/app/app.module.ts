import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* ===================[COMPONENTES]====================== */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grapth1Component } from './pages/grapth1/grapth1.component';
import { NofoundComponent } from './shared/nofound/nofound.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebardComponent } from './shared/sidebard/sidebard.component';
import { BreadcrumComponent } from './shared/breadcrum/breadcrum.component';

/* ===================[RUTAS]====================== */
import { APP_ROUTES } from './app.routes';
import { PagesComponent } from './pages/pages.component';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NofoundComponent,
    DashboardComponent,
    ProgressComponent,
    Grapth1Component,
    HeaderComponent,
    SidebardComponent,
    BreadcrumComponent,
    PagesComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

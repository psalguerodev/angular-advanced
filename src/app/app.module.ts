import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NofoundComponent } from './nofound/nofound.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { Grapth1Component } from './pages/grapth1/grapth1.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebardComponent } from './shared/sidebard/sidebard.component';
import { BreadcrumComponent } from './shared/breadcrum/breadcrum.component';


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
    BreadcrumComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

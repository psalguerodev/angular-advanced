import { NgModule } from '@angular/core';

/* ===================[COMPONENTS]====================== */
import { BreadcrumComponent } from './breadcrum/breadcrum.component';
import { NofoundComponent } from './nofound/nofound.component';
import { HeaderComponent } from './header/header.component';
import { SidebardComponent } from './sidebard/sidebard.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PipesModule } from './../pipes/pipes.module';

@NgModule({
  declarations:[
    HeaderComponent,
    NofoundComponent,
    BreadcrumComponent,
    SidebardComponent
  ],
  imports:[
    RouterModule,
    CommonModule,
    PipesModule
  ],
  exports:[
    HeaderComponent,
    NofoundComponent,
    BreadcrumComponent,
    SidebardComponent
  ]
})

export class SharedModule {}

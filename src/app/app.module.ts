import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'


/* ===================[MODULES]====================== */
import { PagesModule } from './pages/pages.module'

/* ===================[COMPONENTS]====================== */
import { AppComponent } from './app.component'
import { LoginComponent } from './login/login.component'
import { RegisterComponent } from './register/register.component'
import { PagesComponent } from './pages/pages.component';

/* ===================[ROUTES]====================== */
import { APP_ROUTES } from './app.routes'

/* ===================[SERVICES]====================== */
import { SerivceModule } from './services/serivce.module';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PagesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    APP_ROUTES,
    SerivceModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

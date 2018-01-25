import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/* ===================[MODULES]====================== */
import { PagesModule } from './pages/pages.module';

/* ===================[COMPONENTS]====================== */
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

/* ===================[ROUTES]====================== */
import { APP_ROUTES } from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    PagesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

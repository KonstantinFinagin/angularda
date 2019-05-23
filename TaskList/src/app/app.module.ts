import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegisterComponent } from './modules/authentication/components/register/register.component';
import { routing } from './app.routing';
import { AppConfigModule } from './app-config/app-config.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MaterialModule } from './modules/shared/material.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { ErrorComponent } from './components/error/error.component';
import { ProjectService } from './services/project/project.service';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    DashboardComponent,
    MainPageComponent,
    RegisterComponent,
    WelcomeComponent,
    ErrorComponent,
  ],
  imports: [
    AuthenticationModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    routing,
    AppConfigModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

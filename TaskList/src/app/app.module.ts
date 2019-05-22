import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ToolbarComponent } from './components/navigation/toolbar.component';
import { LoginComponent } from './modules/authentication/components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './modules/authentication/components/register/register.component';
import { routing } from './app.routing';
import { AppConfigModule } from './app-config/app-config.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { MaterialModule } from './modules/shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    LoginComponent,
    DashboardComponent,
    MainPageComponent,
    RegisterComponent
  ],
  imports: [
    AuthenticationModule,
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    routing,
    AppConfigModule,
    HttpClientModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

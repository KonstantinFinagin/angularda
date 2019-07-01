import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { AppConfigModule } from './app-config/app-config.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationModule } from './modules/authentication/authentication.module';
import { JwtInterceptor } from './helpers/jwt.interceptor';
import { ProjectService } from './services/project/project.service';
import { SharedModule } from './modules/shared/shared.module';
import { HomeModule } from './modules/home/home.module';
import { DashboardModule } from './modules/dashboard/dashboard.module';
import { ToolbarComponent } from './modules/shared/toolbar/toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent
  ],
  imports: [
    SharedModule,
    AuthenticationModule,
    HomeModule,
    DashboardModule,
    BrowserModule,
    BrowserAnimationsModule,
    routing,
    AppConfigModule,
    HttpClientModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    ProjectService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { MaterialModule } from './shared/material.module';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { ToolbarComponent } from './toolbar/toolbar.component';

const routes: Routes = [
  { path: '',
    component: MainLayoutComponent,
    children: [
    ] },
  { path: '**', redirectTo: '' }
];


@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    ToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

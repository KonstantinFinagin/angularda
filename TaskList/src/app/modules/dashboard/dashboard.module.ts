import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewTicketComponent } from './components/dashboard/new-ticket/new-ticket.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NewTicketComponent,
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    NewTicketComponent
  ]
})
export class DashboardModule { }

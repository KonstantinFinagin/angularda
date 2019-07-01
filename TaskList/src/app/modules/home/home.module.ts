import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditTimesheetComponent } from './components/main-page/edit-timesheet/edit-timesheet.component';
import { MainPageComponent } from './components/main-page/main-page.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    EditTimesheetComponent,
    MainPageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  entryComponents: [
    EditTimesheetComponent
  ]
})
export class HomeModule { }

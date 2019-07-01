import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ErrorComponent } from './error/error.component';
import { SmoothHeightComponent } from 'src/app/helpers/smooth-height.component';
import { OnlyNumberDirective } from 'src/app/helpers/onlynumber.directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ErrorComponent,
    SmoothHeightComponent,
    OnlyNumberDirective,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    DragDropModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    DragDropModule
  ]
})
export class SharedModule { }

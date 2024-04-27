import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingFormsRoutingModule } from './training-forms-routing.module';
import { TrainingFormsComponent } from './training-forms.component';


@NgModule({
  declarations: [
    TrainingFormsComponent
  ],
  imports: [
    CommonModule,
    TrainingFormsRoutingModule
  ]
})
export class TrainingFormsModule { }

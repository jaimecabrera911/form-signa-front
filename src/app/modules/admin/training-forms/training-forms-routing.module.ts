import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingFormsComponent } from './training-forms.component';

const routes: Routes = [{ path: '', component: TrainingFormsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingFormsRoutingModule { }

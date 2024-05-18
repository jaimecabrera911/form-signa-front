import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsProjectComponent } from './forms-project.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    {
        path: '',
        component: FormsProjectComponent ,
        children: [
            {
                path: 'project/:id',
                component: IndexComponent
            },
            {
                path: 'create',
                component: FormComponent
            },
            {
                path: 'edit/:id',
                component: FormComponent
            }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsProjectRoutingModule { }

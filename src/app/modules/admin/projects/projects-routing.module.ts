import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
    {
        path: '',
        component: ProjectsComponent ,
        children: [
            {
                path: '',
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
export class ProjectsRoutingModule { }

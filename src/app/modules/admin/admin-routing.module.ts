import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
    {
        path: '',
        component: AdminComponent,
        children: [
            {
                path: '',
                redirectTo: '/home',
                pathMatch: 'full'
            },
            {
                path: 'home',
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
            },
            {
                path: 'projects',
               // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
               loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule)
            },
            {
                path: 'employees',
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule)
            },
        ]
    },
    { path: 'companies', loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule) },
    { path: 'training-forms', loadChildren: () => import('./training-forms/training-forms.module').then(m => m.TrainingFormsModule) }
];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

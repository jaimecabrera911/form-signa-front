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
            {
                path: 'companies',
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                loadChildren: () => import('./companies/companies.module').then(m => m.CompaniesModule)
            },
            {   path: 'forms-project',
                // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
                loadChildren: () => import('./forms-project/forms-project.module').then(m => m.FormsProjectModule)
            }
        ]
    },

];



@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AdminRoutingModule { }

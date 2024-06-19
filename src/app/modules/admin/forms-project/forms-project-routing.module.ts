import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsProjectComponent } from './forms-project.component';
import { TemplatesComponent } from './templates/templates.component';
import { GeneratedComponent } from './generated/generated.component';
import { SGFR08Component } from './sgfr08/sgfr08.component';
import { Sgfr76Component } from './sgfr76/sgfr76.component';
import { Sgfr32Component } from './sgfr32/sgfr32.component';
import { Sgfr56Component } from './sgfr56/sgfr56.component';
import { Sgfr78Component } from './sgfr78/sgfr78.component';
import { Sgfr86Component } from './sgfr86/sgfr86.component';
import { Sglc02Component } from './sglc02/sglc02.component';
import { Sglc24Component } from './sglc24/sglc24.component';
import { Sglc25Component } from './sglc25/sglc25.component';
import { Sglc31Component } from './sglc31/sglc31.component';

const routes: Routes = [
    {
        path: '',
        component: FormsProjectComponent ,
        children: [
            {
                path: '',
                component: TemplatesComponent
            },
            {
                path: 'templates',
                component: TemplatesComponent
            },
            {
                path: 'generated',
                component: GeneratedComponent
            },
            {
                path: 'sg-fr-08',
                component: SGFR08Component
            },
            {
                path: 'sg-fr-08/edit/:id',
                component: SGFR08Component
            },
            {
                path: 'sg-fr-76',
                component: Sgfr76Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sgfr76Component
                    }
                ]
            },
            {
                path: 'sg-fr-32',
                component: Sgfr32Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sgfr32Component
                    }
                ]
            },
            {
                path: 'sg-fr-56',
                component: Sgfr56Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sgfr56Component
                    }
                ]
            },
            {
                path: 'sg-fr-78',
                component: Sgfr78Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sgfr78Component
                    }
                ]
            },
            {
                path: 'sg-fr-86',
                component: Sgfr86Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sgfr86Component
                    }
                ]
            },
            {
                path: 'sg-lc-02',
                component: Sglc02Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sglc02Component
                    }
                ]
            },
            {
                path: 'sg-lc-24',
                component: Sglc24Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sglc24Component
                    }
                ]
            },
            {
                path: 'sg-lc-25',
                component: Sglc25Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sglc25Component
                    }
                ]
            },
            {
                path: 'sg-lc-31',
                component: Sglc31Component,
                children: [
                    {
                        path: 'edit/:id',
                        component: Sglc31Component
                    }
                ]
            }
        ]
    }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormsProjectRoutingModule { }

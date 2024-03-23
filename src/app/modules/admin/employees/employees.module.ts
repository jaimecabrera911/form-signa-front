import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EmployeesRoutingModule } from './employees-routing.module';
import { EmployeesComponent } from './employees.component';
import { IndexComponent } from './index/index.component';


import { ContentModule } from 'app/components/content/content.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { ListModule } from 'app/components/list/list.module';
import { MatTableResponsiveModule } from 'app/components/mat-table-responsive/mat-table-responsive.module';
import { CrmFormModule } from 'app/components/crm-form/crm-form.module';
import { FormComponent } from './form/form.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgxDropzoneModule } from 'ngx-dropzone';

@NgModule({
    declarations: [
        EmployeesComponent,
        IndexComponent,
        FormComponent
    ],
    imports: [
        CommonModule,
        EmployeesRoutingModule,
        ContentModule,
        ListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatTabsModule,
        MatStepperModule,
        MatCheckboxModule,
        ReactiveFormsModule,
        FormsModule,
        MatSlideToggleModule,
        OverlayModule,
        MatDialogModule,
        MatTableResponsiveModule,
        CrmFormModule,
        NgxDropzoneModule
    ]
})
export class EmployeesModule { }

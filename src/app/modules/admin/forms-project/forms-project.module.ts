import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsProjectRoutingModule } from './forms-project-routing.module';
import { FormsProjectComponent } from './forms-project.component';
import { IndexComponent } from './index/index.component';
import { FormComponent } from './form/form.component';

import { ContentModule } from 'app/components/content/content.module';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
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
import { MatCheckboxModule } from '@angular/material/checkbox';


@NgModule({
    declarations: [
        FormsProjectComponent,
        IndexComponent,
        FormComponent
    ],
    imports: [
        CommonModule,
        FormsProjectRoutingModule,
        ContentModule,
        ListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
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
        CrmFormModule
    ]
})
export class FormsProjectModule { }

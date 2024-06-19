import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
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
import { ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { ListModule } from 'app/components/list/list.module';
import { MatTableResponsiveModule } from 'app/components/mat-table-responsive/mat-table-responsive.module';
import { CrmFormModule } from 'app/components/crm-form/crm-form.module';
import { FormComponent } from './form/form.component';
import { TablesItemsModule } from 'app/components/tables-items/tables-items.module';


@NgModule({
  declarations: [
    ProjectsComponent,
    IndexComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProjectsRoutingModule,
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
    ReactiveFormsModule,
    MatSlideToggleModule,
    OverlayModule,
    MatDialogModule,
    MatTableResponsiveModule,
    CrmFormModule,
    TablesItemsModule
  ],
  exports: [
    MatTableResponsiveModule
  ]
})
export class ProjectsModule { }

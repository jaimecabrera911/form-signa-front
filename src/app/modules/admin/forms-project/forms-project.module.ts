import { MatCardModule } from '@angular/material/card';
import { MultimediaModule } from 'app/components/multimedia/multimedia.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsProjectRoutingModule } from './forms-project-routing.module';
import { FormsProjectComponent } from './forms-project.component';

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
import { TemplatesComponent } from './templates/templates.component';
import { GeneratedComponent } from './generated/generated.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { SGFR08Component } from './sgfr08/sgfr08.component';
import { Sgfr76Component } from './sgfr76/sgfr76.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { Sgfr32Component } from './sgfr32/sgfr32.component';
import { Sgfr56Component } from './sgfr56/sgfr56.component';
import { Sgfr78Component } from './sgfr78/sgfr78.component';
import { Sgfr86Component } from './sgfr86/sgfr86.component';
import { Sglc02Component } from './sglc02/sglc02.component';
import { Sglc24Component } from './sglc24/sglc24.component';
import { Sglc25Component } from './sglc25/sglc25.component';
import { Sglc31Component } from './sglc31/sglc31.component';
import { TablesItemsComponent } from 'app/components/tables-items/tables-items.component';
import { TablesItemsModule } from 'app/components/tables-items/tables-items.module';
import { ApprovalComponent } from './approval/approval.component';
import { MatSelectModule } from '@angular/material/select';
import { SignatureAssitantComponent } from './signature-assitant/signature-assitant.component';


@NgModule({
    declarations: [
        FormsProjectComponent,
        TemplatesComponent,
        GeneratedComponent,
        SGFR08Component,
        Sgfr76Component,
        Sgfr32Component,
        Sgfr56Component,
        Sgfr78Component,
        Sgfr86Component,
        Sglc02Component,
        Sglc24Component,
        Sglc25Component,
        Sglc31Component,
        ApprovalComponent,
        SignatureAssitantComponent
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
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CrmFormModule,
        MultimediaModule,
        TablesItemsModule,
        MatCardModule,
        MatSelectModule
    ]
})
export class FormsProjectModule { }

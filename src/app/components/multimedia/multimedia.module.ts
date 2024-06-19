import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PanelsMultimediaDirective } from './panels-multimedia.directive';
import { ActionsMultimediaDirective } from './actions-multimedia.directive';
import { AditionalMultimediaDirective } from './aditional-multimedia.directive';
import { MultimediaComponent } from './multimedia.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { MatInputModule } from '@angular/material/input';
import { DetailUploadComponent } from './detail-upload/detail-upload.component';
import { CrmFormModule } from '../crm-form/crm-form.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';



@NgModule({
    declarations: [
        MultimediaComponent,
        PanelsMultimediaDirective,
        ActionsMultimediaDirective,
        AditionalMultimediaDirective,
        DetailUploadComponent
    ],
    exports: [
        MultimediaComponent,
        PanelsMultimediaDirective,
        ActionsMultimediaDirective,
        AditionalMultimediaDirective
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        NgxDropzoneModule,
        MatButtonModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        CrmFormModule,
        ReactiveFormsModule
    ]
})
export class MultimediaModule { }

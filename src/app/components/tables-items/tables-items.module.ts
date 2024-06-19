import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TablesItemsComponent } from './tables-items.component';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MultimediaComponent } from '../multimedia/multimedia.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ActionsTableDirective } from './actions-table.directive';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { CrmFormModule } from '../crm-form/crm-form.module';
import { NgInitDirective } from '../directives/ng-init.directive';

@NgModule({
    declarations: [
        TablesItemsComponent,
        ActionsTableDirective,
        NgInitDirective
    ],
    imports: [
        CommonModule,
        MatIconModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatInputModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        ReactiveFormsModule,
        CrmFormModule,
    ],
    exports: [
        TablesItemsComponent,
        ActionsTableDirective
    ],
})
export class TablesItemsModule { }

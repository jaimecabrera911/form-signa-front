import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from './table/table.component';
import { ContentModule } from '../content/content.module';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableResponsiveModule } from '../mat-table-responsive/mat-table-responsive.module';



@NgModule({
  declarations: [
    TableComponent,
  ],
  imports: [
    CommonModule,
    ContentModule,
    MatTableModule,
    MatMenuModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableResponsiveModule
  ],
  exports: [
    TableComponent
  ]
})
export class ListModule { }

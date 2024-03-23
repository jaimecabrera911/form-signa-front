import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ListComponent } from 'app/components/list/list-component';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';

const iterableColumns: TableItems[] = [
    { name: 'names', label: 'Nombres', panel: false },
    { name: 'identificationNumber', label: 'Documento', panel: false },
    { name: 'position', label: 'Cargo', panel: false },
    { name: 'email', label: 'Correo', panel: false }
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends ListComponent implements OnInit {

    title = 'Base empleados';
    subtitle =  new Path().getModule();
    searchPanel: boolean = true;
    public override apiItems$ = this.api.employeesService();
    public override colums = iterableColumns;

    constructor(
        protected api: ApiService,
    ) {
        super(api);
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    sortData($event: Sort): void {
        console.log($event.direction);
        console.log($event);
        this.sortBy = $event.active;
        this.direction = $event.direction;
        this.getItems();
    }

    initForm(): void {
    }

}

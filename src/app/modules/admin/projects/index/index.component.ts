import { Component, OnInit } from '@angular/core';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListComponent } from 'app/components/list/list-component';
import { Path } from 'app/components/routers/path';
import { ActionsTable } from 'app/models/table/actions-table';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';

const iterableColumns: TableItems[] = [
    { name: 'id', label: 'ID  Proyecto', panel: false },
    { name: 'name', label: 'Nombre proyecto', panel: false },
    { name: 'createdAt', label: 'Fecha creación', panel: false },
    { name: 'state', label: 'Estado', panel: false }
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends ListComponent implements OnInit {

    title =  new Path().getModule();
    subtitle = 'Listado';
    searchPanel: boolean = true;
    public override apiItems$ = this.api.projectService();
    public override colums = iterableColumns;

    constructor(
        protected api: ApiService,
    ) {
        super(api);
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    initForm(): void {
    }

}

import { Component, OnInit } from '@angular/core';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListComponent } from 'app/components/list/list-component';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';

const iterableColumns: TableItems[] = [
    { name: 'names', label: 'ID  Proyecto', panel: false },
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

    title = 'Listado';
    subtitle = new Path().getModule();
    swaAlert = new SwalAlert();
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

    initForm(): void {
    }

}

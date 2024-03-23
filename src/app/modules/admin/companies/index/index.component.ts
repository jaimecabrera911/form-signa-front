import { Component, OnInit } from '@angular/core';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListComponent } from 'app/components/list/list-component';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';

const iterableColumns: TableItems[] = [
    { name: 'identificationType', label: 'Tipo', panel: false },
    { name: 'identificationNumber', label: 'Número', panel: false },
    { name: 'name', label: 'Nombre', panel: false },
    { name: 'email', label: 'Correo', panel: false },
    { name: 'phone', label: 'Teléfono', panel: false },
];

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent extends ListComponent implements OnInit {

    title = new Path().getModule();
    subtitle = 'Listado compañias';
    searchPanel: boolean = true;
    public override apiItems$ = this.api.companyService();
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
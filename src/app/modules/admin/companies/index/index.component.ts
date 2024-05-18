import { Component, OnInit } from '@angular/core';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    title = new Path().getModule();
    subtitle = 'Listado compañias';
    searchPanel: boolean = true;
    apiItems$: Observable<any>;
    iterableColumns: TableItems[] = [
        { name: 'identificationNumber', name2: false, styleEnable: false, label: 'Número' },
        { name: 'name', name2: false, styleEnable: false, label: 'Nombre' },
        { name: 'address', name2: false, styleEnable: false, label: 'Dirección' },
        { name: 'legalRepresentative', name2: false, styleEnable: false, label: 'Rep legal' },
        { name: 'email', name2: false, styleEnable: false, label: 'Correo' },
        { name: 'phone', name2: false, styleEnable: false, label: 'Teléfono' }
    ];

    constructor(
        protected api: ApiService,
    ) { }

    ngOnInit(): void {
        this.apiItems$ = this.api.companyService();
    }

}

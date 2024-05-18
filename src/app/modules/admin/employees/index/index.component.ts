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

    title = 'Base empleados';
    subtitle = new Path().getModule();
    searchPanel: boolean = true;
    apiItems$: Observable<any>;
    iterableColumns: TableItems[] = [
        { name: 'names', name2: false, styleEnable:false, label: 'Nombres' },
        { name: 'identificationNumber', name2: false, styleEnable:false, label: 'Documento' },
        { name: 'position', name2: 'name', styleEnable:false, label: 'Cargo' },
        { name: 'email', name2: false, styleEnable:false, label: 'Correo' },
        { name: 'enabled', name2: false, label: 'Estado', styleEnable:true,  styles: [
                { label: 'Activo', textColor: '#0D7D62', backgroundColor: '#ADE2C2' },
                { label: 'Inactivo', textColor: '#C92C2C', backgroundColor: '#F4B2B6' }
            ]
        }
    ];

    constructor(protected api: ApiService) { }

    ngOnInit(): void {
        this.apiItems$ = this.api.employeesService();
    }

}

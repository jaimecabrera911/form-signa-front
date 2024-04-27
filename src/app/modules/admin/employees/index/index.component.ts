import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ListComponent } from 'app/components/list/list-component';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';

const iterableColumns: TableItems[] = [
    { name: 'names', name2: false, styleEnable:false, label: 'Nombres' },
    { name: 'identificationNumber', name2: false, styleEnable:false, label: 'Documento' },
    { name: 'position', name2: 'name', styleEnable:false, label: 'Cargo' },
    { name: 'email', name2: false, styleEnable:false, label: 'Correo' },
    { name: 'enabled', name2: false, label: 'Estado', styleEnable:true,  styles: [
            { label: true, textColor: '#0D7D62', backgroundColor: '#ADE2C2' },
            { label: false, textColor: '#C92C2C', backgroundColor: '#F4B2B6' }
        ]
    }
];

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent extends ListComponent implements OnInit {

    title = 'Base empleados';
    subtitle = new Path().getModule();
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

    initForm(): void {
    }

}

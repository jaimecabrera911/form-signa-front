import { Component, OnInit } from '@angular/core';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListComponent } from 'app/components/list/list-component';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';

const iterableColumns: TableItems[] = [
    { name: 'code', name2: false, styleEnable:false, label: 'Número' },
    { name: 'name', name2: false, styleEnable:false, label: 'Nombre' },
    { name: 'startDate', name2: false, styleEnable:false, label: 'Fecha creación' },
    { name: 'endDate', name2: false, styleEnable:false, label: 'Fecha finalización' },
    { name: 'city', name2: 'name', styleEnable:false, label: 'Ubicación' },
    { name: 'user', name2: 'username', styleEnable:false, label: 'Responsable' },
    { name: 'state', name2: 'name', styleEnable:false, label: 'Estado', styles: [
            { label: 'En Ejecucion', textColor: '#A229CC', backgroundColor: '#F0D7F9' },
            { label: 'Por iniciar', textColor: '#0F4EC9', backgroundColor: '#AAC1FE' },
            { label: 'Terminado', textColor: '#0D7D62', backgroundColor: '#D5F0E0' },
            { label: 'Suspendido', textColor: '#C92C2C', backgroundColor: '#F4B2B6' }
        ]
    }
];

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent extends ListComponent implements OnInit {
    title = new Path().getModule();
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

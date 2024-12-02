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
export class IndexComponent  implements OnInit {
    title = new Path().getModule();
    subtitle = 'Listado';
    searchPanel: boolean = true;
    apiItems$: Observable<any>;
    iterableColumns: TableItems[] = [
        { name: 'uid', name2: false, styleEnable:false, label: 'Número' },
        { name: 'name', name2: false, styleEnable:false, label: 'Nombre' },
        { name: 'startDate', name2: false, formatDate: true, styleEnable:false, label: 'Fecha creación' },
        { name: 'endDate', name2: false, formatDate: true, styleEnable:false, label: 'Fecha finalización' },
        { name: 'status', name2: false, styleEnable:false, label: 'Estado', styles: [
                { label: 'active', textColor: '#A229CC', backgroundColor: '#F0D7F9' },
                { label: 'pending', textColor: '#0F4EC9', backgroundColor: '#AAC1FE' },
                { label: 'completed', textColor: '#0D7D62', backgroundColor: '#D5F0E0' }
            ]
        },
        { name: 'view', name2: false, id: 'uid', styleEnable: false, label: 'Ver', view: true, editModule: 'projects' },
        { name: 'edit', name2: false, id: 'uid', styleEnable: false, label: 'Editar', edit: true, editModule: 'projects' }
    ];

    constructor(
        protected api: ApiService,
    ) {
    }

    ngOnInit(): void {
        this.apiItems$ = this.api.projectService();
    }
}

import { Component, OnInit } from '@angular/core';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-generated',
    templateUrl: './generated.component.html',
    styleUrls: ['./generated.component.scss']
})
export class GeneratedComponent implements OnInit {

    title = 'Plantilla generadas';
    subtitle = new Path().getModule();
    searchPanel: boolean = true;
    apiItems$: Observable<any>;

    iterableColumns: TableItems[] = [
        { name: 'code', name2: false, styleEnable: false, label: 'Formulario' },
        { name: 'name', name2: false, styleEnable: false, label: 'Descripción' }
    ];

    constructor(protected api: ApiService) { }

    ngOnInit(): void {
        this.apiItems$ = this.api.formsService();
    }

}

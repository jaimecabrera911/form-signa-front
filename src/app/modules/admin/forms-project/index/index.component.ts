import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Path } from 'app/components/routers/path';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-index',
    templateUrl: './index.component.html',
    styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

    title = 'Base empleados';
    subtitle = new Path().getModule();
    searchPanel: boolean = false;
    apiItems$: Observable<any>;

    constructor(protected api: ApiService) { }

    ngOnInit(): void {
        this.apiItems$ = this.api.employeesService();
    }

}

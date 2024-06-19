/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, Input, ViewChild, ContentChildren, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Functions } from 'app/components/functions/functions';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss']
})
export class ApprovalComponent implements AfterViewInit, OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;

    @Input() data?: Observable<any>;
    @Input() selectedItems?: any[];
    @Input() formId?: number;
    @Input() typeTable?: string;
    //@Input() colums?: any[];
    @Input() placeHolderSearch?: string;
    form: FormGroup;

    formInit: any = this._formBuilder.group({
        selectAutoComplete: new FormControl('')
    });

    displayedColumns: string[] = [];
    dataSource: MatTableDataSource<any> = new MatTableDataSource<any>([]);
    background: string = '#748EB8';
    color: string = '#FFFFFF';
    pageSizeOptions = [5, 10, 15, 20, 50, 100];
    itemsAutoComplte: any = [];
    elements: any = [];
    assistantsItems: any = [];
    function: any = new Functions();

    //displayedColumns: string[] = ['firstName', 'secondName', 'firstSurname', 'secondSurname'];

    colums: TableItems[] = [
        { name: 'firstName', name2: false, styleEnable: false, label: 'Nombres' },
        { name: 'firstSurname', name2: false, styleEnable: false, label: '_' },
        { name: 'position', name2: 'name', styleEnable: false, label: 'Cargo' },
        { name: 'reason', name2: '', styleEnable: false, label: 'Motivo' },
        {
            name: 'state', name2: false, label: 'Estado', styleEnable: true, styles: [
                { label: 'Por aprobar', textColor: '#0D7D62', backgroundColor: '#ADE2C2' },
                { label: 'Aprobado', textColor: '#C92C2C', backgroundColor: '#F4B2B6' },
                { label: 'Rechazado', textColor: '#0D7D62', backgroundColor: '#F4B2B6' },
            ]
        },
        { name: 'observation', name2: '', styleEnable: false, label: 'Observaciones' },
        { name: 'id', name2: '', styleEnable: false, label: 'Fecha' },
        { name: 'actions', name2: '', styleEnable: false, label: 'Acciones' }
    ];
    reason: any[] = [
        { code: 'aprobacion', name: 'Aprobación' },
        { code: 'capacitacion', name: 'Capacitación' },
        { code: 'supervisión', name: 'Supervisión' },
    ];
    actions: any[] = [
        { code: 'aprobar', name: 'Aprobar' },
        { code: 'rechazar', name: 'Rechazar' }
    ];

    constructor(protected api: ApiService,
        private _formBuilder: FormBuilder) { }

    ngAfterViewInit(): void {
        this.getItemsTable();
        this.getColumnsTable();
    }

    ngOnInit(): void {
        this.getItemsTable();
    }

    getItemsTable(): void {
        this.api.employeesManagerService().subscribe({
            next: (elements: any) => {
                if (elements.data) {
                    this.elements = this.function.validateResponse(elements.data);
                    this.elements.forEach((item: any) => { item.enabled ? item.enabled = 'Activo' : item.enabled = 'Inactivo'; });
                    this.validateTable(this.elements);
                }
            }, error: (e: any) => console.error(e)
        });
    }

    validateTable(items): void {
        this.configurationTable([]);
        this.selectAutocomplte(items);
    }

    configurationTable(data): void {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    selectAutocomplte(items): void {
        const itemsSelect: any[] = [];
        items.forEach((item: any) =>
            itemsSelect.push({ id: item.id, name: this.function.setNameEmployee(item.firstName, item.secondName, item.firstSurname, item.secondSurname) }));
        this.itemsAutoComplte = [...itemsSelect];
    }

    onSubmit(): void {
        if (this.formInit.value.selectAutoComplete) {
            this.addItemsTable(this.formInit.value.selectAutoComplete);
            const idEmployees = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
        }
    }

    addItemsTable(items): void {
        const employeeId = items.map((item: any) => item.id);
        const itemsSeleted = this.elements.filter(item => employeeId.includes(item.id));
        this.configurationTable(itemsSeleted);
    }

    getColumnsTable(): void {
        for (const val of this.colums) {
            this.displayedColumns.push(val.name);
        }
    }

    asignar(): void {
        if (this.formInit.value.selectAutoComplete) {
            this.addItemsTable(this.formInit.value.selectAutoComplete);
            const idEmployees = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
        }
    }


}

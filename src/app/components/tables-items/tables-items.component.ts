/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @typescript-eslint/prefer-for-of */
/* eslint-disable @typescript-eslint/member-ordering */
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, ContentChildren, Input, OnInit, ViewChild, forwardRef } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Observable, count } from 'rxjs';
import { ActionsTableDirective } from './actions-table.directive';
import { DefaultInput } from '../crm-form/default-input';
import { FormBuilder, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { Functions } from '../functions/functions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignatureAssitantComponent } from 'app/modules/admin/forms-project/signature-assitant/signature-assitant.component';
import { TableItems } from 'app/models/table/table-items';


@Component({
    selector: 'app-tables-items',
    templateUrl: './tables-items.component.html',
    styleUrls: ['./tables-items.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => TablesItemsComponent)
        }
    ]
})
export class TablesItemsComponent extends DefaultInput implements AfterViewInit, OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;
    @ViewChild(MatSort) sort: MatSort;
    @ContentChildren(ActionsTableDirective) children: any;

    @Input() data?: Observable<any>;
    @Input() selectedItems?: any[];
    @Input() formId?: number;
    @Input() typeTable?: string;
    @Input() colums?: any[];
    @Input() searchPanel?: boolean;
    @Input() routeBottom?: string;
    @Input() placeHolderSearch?: string;


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
    assistantsForm: any = [];
    function: any = new Functions();

    constructor(
        private router: Router,
        protected api: ApiService,
        private _formBuilder: FormBuilder,
        private matDialog: MatDialog,
        private _liveAnnouncer: LiveAnnouncer
    ) {
        super();
    }

    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.getItemsTable();
        this.getColumnsTable();
        this.placeHolderSearch = this.placeHolderSearch ? `Buscar ${this.placeHolderSearch}` : 'Buscar empleado';
    }

    getItemsTable(): void {
        if (this.data) {
            this.data.subscribe({
                next: (elements: any) => {
                    if (elements.data) {
                        this.elements = this.function.validateResponse(elements.data);
                        this.elements.forEach((item: any) => { item.enabled ? item.enabled = 'Activo' : item.enabled = 'Inactivo'; });
                        this.validateTable(this.elements);
                        if(this.formId){
                            this.getAssistantsId();
                        }
                    }
                }, error: (e: any) => console.error(e)
            });
        } else {
            return;
        }
    }


    validateTable(items): void {
        if (this.typeTable === 'list') {
            this.configurationTable(items);
        } else {
            this.selectAutocomplte(items);
        }
    }

    selectAutocomplte(items): void {
        const itemsSelect: any[] = [];
        items.forEach((item: any) =>
            itemsSelect.push({ id: item?.id, name: item?.fullName }));
        this.itemsAutoComplte = [...itemsSelect];
    }

    async getAssistantsId(): Promise<void> {
        if (this.formId) {
            const itemsSelect: any[] = [];
            await this.api.assistantFormService(this.formId).subscribe({
                next: (response: any) => {
                    response.data.forEach((item: any) => {
                        this.assistantsForm = response.data;
                        itemsSelect.push({
                            id: item.employee.id,
                            name: this.function.setNameEmployee(item.employee.firstName, item.employee.secondName, item.employee.firstSurname, item.employee.secondSurname)
                        });
                        this.assistantsItems = [...itemsSelect];
                        if (this.elements) {
                            this.elements = this.formatData(this.elements,23);
                            //this.elements.forEach((item: any) => { item.isSigned === true ? item.isSigned = 'Firmo' : item.isSigned = 'No firmo'; });
                            this.addItemsTable(this.assistantsItems);
                        }
                    });
                }, error: (e: any) => console.log('')
            });
        }
    }

    formatData(elements: any, length: any): any {
        const elementsData: any = [];
        for (let i: number = 0; i < length; i++) {
            elementsData.push(elements[i]);
        }
        for (let j: number = 0; j < length; j++) {
            Object.assign(elementsData[j], { isSignature: this.assistantForm(elements[j].id) });
        }
        return elementsData;
    }

    assistantForm(idEmp): void{
        const value = this.assistantsForm.filter((item: any) => item.employee.id === idEmp)
        .map((item: any) => item.isSigned);
        return value[0] === undefined ? false : value[0];
    }


    /*onSubmit(): void {
        if (this.formInit.value.selectAutoComplete) {
            this.addItemsTable(this.formInit.value.selectAutoComplete);
            const idEmployees = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
            this.writeValue(idEmployees);
        }
    }*/

    asignar(): void {
        if (this.formInit.value.selectAutoComplete) {
            this.addItemsTable(this.formInit.value.selectAutoComplete);
            const idEmployees = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
            this.writeValue(idEmployees);
        }
    }


    addItemsTable(items): void {
        const employeeId = items.map((item: any) => item.id);
        const itemsSeleted = this.elements.filter(item => employeeId.includes(item.id));
        this.configurationTable(itemsSeleted);
    }


    configurationTable(data): void {
        this.dataSource = new MatTableDataSource<any>(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    /** Announce the change in sort state for assistive technology. */
    announceSortChange(sortState: Sort): void {
        if (sortState.direction) {
            this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
        } else {
            this._liveAnnouncer.announce('Sorting cleared');
        }
    }

    /** Filter */
    applyFilter(event: Event): void {
        const filterValue = (event.target as HTMLInputElement).value;
        if (this.dataSource) {
            this.dataSource.filter = filterValue.trim().toLowerCase();
        }
    }

    /** Columnas */
    getColumnsTable(): void {
        for (const val of this.colums) {
            this.displayedColumns.push(val.name);
        }
    }


    functionTable(id: any, namefunction: any): any {
        if (namefunction === 'isSignature') {
            this.getPreview(id, this.formId);
        }
    }

    getPreview(id, idForm): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '75%';
        dialogConfig.data = {
            employee: id,
            idForm: idForm
        };

        const dialog = this.matDialog.open(SignatureAssitantComponent, dialogConfig);
        dialog.afterClosed().subscribe((success) => {
            if(this.formId){
                this.getAssistantsId();
            }
        });
    }

    routerLink(): void {
        this.router.navigateByUrl(this.routeBottom);
    }

}

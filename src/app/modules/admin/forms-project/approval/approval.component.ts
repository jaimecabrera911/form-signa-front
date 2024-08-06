/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ContentChildren, AfterViewInit, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from 'app/components/crm-form/default-input';
import { Functions } from 'app/components/functions/functions';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-approval',
    templateUrl: './approval.component.html',
    styleUrls: ['./approval.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => ApprovalComponent)
        }
    ]
})
export class ApprovalComponent extends DefaultInput implements AfterViewInit, OnInit {

    @Input() selectedItems?: any[];
    @Input() formId?: number;
    approvalsForm: any = [];
    elements: any = [];
    itemsAutoComplte: any = [];
    approvalsItems: any = [];
    formI: FormGroup;

    formInit: any = this._formBuilder.group({
        selectAutoComplete: new FormControl('')
    });

    formApproval: FormGroup = new FormGroup({
        data: this._formBuilder.array([])
    });

    itemsAprv!: FormArray;
    function: any = new Functions();

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
        { code: 'supervision', name: 'Supervisión' },
    ];

    actions: any[] = [
        { code: 'aprobado', name: 'Aprobar' },
        { code: 'pendiente', name: 'Pendiente' },
        { code: 'rechazado', name: 'Rechazar' }
    ];

    constructor(protected api: ApiService,
        public datepipe: DatePipe,
        private _formBuilder: FormBuilder) {
        super();
    }


    ngAfterViewInit(): void {
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
                    this.selectAutocomplte(this.elements);
                    if (this.formId) {
                        this.getApprovalsId();
                    }
                }
            }, error: (e: any) => console.error(e)
        });
    }

    getApprovalsId(): void {
        if (this.formId) {
            const itemsSelect: any[] = [];
            this.api.approvalFormService(this.formId).subscribe({
                next: (response: any) => {
                    this.approvalsForm = response.data;
                    response?.data?.forEach((item: any) => {
                        itemsSelect.push({
                            id: item?.employee?.id,
                            name: item?.employee?.fullName
                        });
                    });
                    this.approvalsItems = [...itemsSelect];
                    if (this.approvalsItems) {
                        this.formInit.value.selectAutoComplete = this.approvalsItems;
                        this.editarAsignar(response.data);
                    }

                }, error: (e: any) => console.log('')
            });
        }
    }

    selectAutocomplte(items): void {
        const itemsSelect: any[] = [];
        items.forEach((item: any) =>
            itemsSelect.push({ id: item.id, name: this.function.setNameEmployee(item.firstName, item.secondName, item.firstSurname, item.secondSurname) }));
        this.itemsAutoComplte = [...itemsSelect];
    }

    formData(empId, empName): FormGroup {
        return this._formBuilder.group({
            id: [null],
            employee: [empId],
            employeeName: [{ value: empName, disabled: true }],
            state: ['pendiente'],
            reason: [''],
            createdAt: [null],
            enabled: [true],
            observations: []
        });
    }

    addDataGroup(empId, empName): void {
        this.itemsAprv = this.formApproval.get('data') as FormArray;
        this.deleteDataGroup();
        const data = this.formApproval.get('data').value.filter((item: any) => item.employee === empId);
        if (!data[0]) {
            this.itemsAprv.push(this.formData(empId, empName));
        }
        this.addFormValue();
    }

    addFormValue(): void {
        this.writeValue(this.formApproval.get('data').value);
    }

    deleteDataGroup(): void {
        const idSelect = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
        const filterDelete = this.formApproval.get('data').value.filter((item: any) => !idSelect.includes(item.employee)).map((item: any) => item.employee);
        const filterEditDelete = this.approvalsItems.filter((item: any) => !idSelect.includes(item.id)).map((item: any) => item.id);
        if (filterDelete[0] || filterDelete[0] !== undefined) {
            const index = this.formApproval.get('data').value.findIndex(item => item.employee === filterDelete[0]);
            const add = this.formApproval.get('data') as FormArray;
            add.removeAt(index);
        }
    }

    asignar(): void {
        this.formInit.value.selectAutoComplete.forEach((element: any, i: number) => {
            this.addDataGroup(element.id, element.name);
        });
    }

    editarAsignar(items): void {
        items.forEach((element: any, i: number) => {
            this.editDataGroup(element.id, element.employee.id,
                element.employee.fullName,
                element.state, element.reason, element.observations, element.createdAt);
        });
    }

    editDataGroup(id, empId, empName, state, reason, observations, createdAt): void {
        const itemsAprv = this.formApproval.get('data') as FormArray;
        itemsAprv.push(this.formEditData(id, empId, empName, state, reason, observations, createdAt));
    }

    formEditData(id, empId, empName, state, reason, observations, createdAt): FormGroup {
        return this._formBuilder.group({
            id: [id],
            employee: [empId],
            employeeName: [{ value: empName, disabled: true }],
            state: [state],
            reason: [reason],
            createdAt: [{ value: this.datepipe.transform(createdAt, 'yyyy-MM-dd'), disabled: true }],
            observations: [observations]
        });
    }

}

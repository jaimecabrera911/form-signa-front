import { Employee } from './../../../../models/employee';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { DatePipe } from '@angular/common';
import { Component, OnInit, Input, ViewChild, ContentChildren, AfterViewInit, forwardRef } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { DefaultInput } from 'app/components/crm-form/default-input';
import { Functions } from 'app/components/functions/functions';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';
import { LoginService } from 'app/services/login.service';

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
        { code: 'inspeccion', name: 'Inspección' },
        { code: 'resvisarInspeccion', name: 'Resvisar Inspección' },
    ];

    actions: any[] = [
        { code: 'aprobado', name: 'Aprobar' },
        { code: 'pendiente', name: 'Pendiente' },
        { code: 'rechazado', name: 'Rechazar' }
    ];

    constructor(protected api: ApiService,
        public datepipe: DatePipe,
        protected login: LoginService,
        private _formBuilder: FormBuilder) {
        super();
    }


    ngAfterViewInit(): void {
    }

    ngOnInit(): void {
        this.itemsAprv = this.formApproval.get('data') as FormArray;
        this.getItemsTable();
    }

    getItemsTable(): void {
        this.api.employeesService().subscribe({
            next: (elements: any) => {
                if (elements) {
                    const isManagener = elements.filter((item: any) => item.isManager === true);
                    this.elements = isManagener;
                    this.elements = this.function.validateResponse(this.elements);
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
            this.api.approvalFormService(this.formId).subscribe({
                next: (response: any) => {
                    this.assignSelectAutocomplte(response);
                    this.validateApproval();
                }, error: (e: any) => console.log('')
            });
        }
    }

    disableControl(index: number): void {
        this.itemsAprv.controls[index].disable();
    }

    validateApproval(): void{
        const list = this.formApproval.controls['data'].value;
        list.forEach((item: any) => {
            const findIndex = list.findIndex(emp => emp.employeeId === item.employeeId);
                if(item.employeeId !== this.login?.currentUserValue?.uid){
                    this.disableControl(findIndex);
                }
            });
    }

    selectAutocomplte(items): void {
        const itemsSelect: any[] = [];
        items.forEach((item: any) =>
            itemsSelect.push({ id: item.uid, name: item.fullName }));
        this.itemsAutoComplte = [...itemsSelect];
    }

    assignSelectAutocomplte(response: any): void{
        const itemsSelect: any[] = [];
        this.approvalsForm = response;
        response?.forEach((item: any) => {
            itemsSelect.push({
                id: item?.employee?.uid,
                name: item?.employee?.fullName
            });
        });
        this.approvalsItems = [...itemsSelect];
        if (this.approvalsItems) {
            this.formInit.value.selectAutoComplete = this.approvalsItems;
            this.editarAsignar(this.approvalsForm);
        }
    }

    formData(empId, empName): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(null),
            employeeId: new FormControl(empId),
            employeeName: new FormControl({ value: empName, disabled: true }),
            state: new FormControl('pendiente'),
            reason: new FormControl('',Validators.required),
            createdAt: new FormControl(null),
            enabled: new FormControl(true),
            observations: new FormControl()
        });
    }

    addDataGroup(empId, empName): void {
        const data = this.itemsAprv.controls
                        .filter((item: any) => item.value.employeeId === empId)
                        .map((item: any) => item.value);
        if (data.length === 0) {
            this.itemsAprv.push(this.formData(empId, empName));
        }
        this.addFormValue();
    }

    addFormValue(): void {
        const itemsApprovals: any[] = [];
        this.itemsAprv.controls.forEach( (item: any) => itemsApprovals.push(item.value));
        this.writeValue(itemsApprovals);
    }

    deleteDataGroup(): void {
        const idSelect = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
        const filterDelete = this.itemsAprv.controls
                                .filter((item: any) => !idSelect.includes(item.value.employeeId))
                                .map((item: any) => item.value.employeeId);
        if (filterDelete.length > 0) {
            const index = this.itemsAprv.controls
                                .findIndex(item => item.value.employeeId === filterDelete[0]);
            const add = this.formApproval.get('data') as FormArray;
            add.removeAt(index);
        }
    }


    editarAsignar(items): void {
        items.forEach((element: any, i: number) => {
            this.editDataGroup(element.id, element.employee.uid, element.employee.fullName,
                element.state, element.reason, element.observations, element.createdAt);
        });
    }

    editDataGroup(id, empId, empName, state, reason, observations, createdAt): void {
        this.itemsAprv.push(this.formEditData(id, empId, empName, state, reason, observations, createdAt));
    }

    formEditData(id, empId, empName, state, reason, observations, createdAt): FormGroup {
        return this._formBuilder.group({
            id: new FormControl({ value: id, disabled: false }),
            employeeId: new FormControl({ value: empId, disabled: false }),
            employeeName: new FormControl({ value: empName, disabled: false }),
            state: new FormControl({ value: state, disabled: false }),
            reason: new FormControl({ value: reason, disabled: false }, Validators.required),
            createdAt: new FormControl({ value: this.datepipe.transform(createdAt, 'yyyy-MM-dd'), disabled: true }),
            observations: new FormControl(observations)
        });
    }

    asignar(): void {
        this.formInit.value.selectAutoComplete.forEach((element: any, i: number) => {
            this.addDataGroup(element.id, element.name);
        });
        this.deleteDataGroup();
    }

}

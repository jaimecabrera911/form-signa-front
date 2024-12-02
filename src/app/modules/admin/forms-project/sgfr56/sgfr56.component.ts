import { filter } from 'rxjs';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { DatePipe } from '@angular/common';
import { Functions } from 'app/components/functions/functions';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { SignatureAssitantComponent } from '../signature-assitant/signature-assitant.component';
import { MatPaginator } from '@angular/material/paginator';

@Component({
    selector: 'app-sgfr56',
    templateUrl: './sgfr56.component.html',
    styleUrls: ['./sgfr56.component.scss']
})
export class Sgfr56Component extends ControllerFormsComponent implements OnInit {

    @ViewChild(MatPaginator) paginator: MatPaginator;

    override code = 'SG-FR-56';
    override id = this.activatedRouter.snapshot?.paramMap.get('id');

    approvalsForm: any = [];
    elements: any = [];
    itemsAutoComplte: any = [];
    approvalsItems: any = [];
    formI: FormGroup;
    itemsAprv!: FormArray;
    function: any = new Functions();

    constructor(protected router: Router,
        protected _formBuilder: FormBuilder,
        protected activatedRouter: ActivatedRoute,
        public datepipe: DatePipe,
        protected matDialog: MatDialog,
        protected api: ApiService
    ) {
        super(_formBuilder, matDialog, api);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.validateForm();
        this.getProject();
        this.getItemsTable();
        this.getHealthcareProvider();
        this.getOccupationRiskManager();
    }

    validateForm(): void {
        this.formInit = this._formBuilder.group({
            code: new FormControl({ value: this.code, disabled: true }),
            version: new FormControl({ value:'1.0', disabled: true }),
            projectUid: new FormControl('', [Validators.required]),
            assistants: new FormControl([]),
            company: new FormControl(1),
            fields: new FormArray([
                this._formBuilder.group({ name: 'workplace', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'companyName', value: '', type: this.getTypeValue(1) })
            ]),
            dataFields: this._formBuilder.array([]),
            fieldsItems: this._formBuilder.group({
                workplace: new FormControl(''),
                companyName: new FormControl(''),
            }),
            data: this._formBuilder.array([]),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl(),
            selectAutoComplete: new FormControl()
        });
    }

    override getForm(): void {
        if (this.id) {
            this.formInit.get('fieldsItems').patchValue({
                workplace: this.cleanSelect(this.getValueField('workplace')),
                companyName: this.cleanSelect(this.getValueField('companyName'))
            });
            this.getView();
        };
    }

    getItemsTable(): void {
        this.api.employeesManagerService().subscribe({
            next: (elements: any) => {
                if (elements.data) {
                    this.elements = this.function.validateResponse(elements.data);
                    this.elements.forEach((item: any) => { item.enabled ? item.enabled = 'Activo' : item.enabled = 'Inactivo'; });
                    this.selectAutocomplte(this.elements);
                    if (this.id) {
                        this.getSelectEmployeesId(this.elements);
                    }
                }
            }, error: (e: any) => console.error(e)
        });
    }

    getSelectEmployeesId(...listEmployees): void {
        const idsEmp = this.filesArrays.map((item: any) => item[0].id);
        const employes = listEmployees[0]
            .filter((item: any) => idsEmp.includes(item.id))
            .map((item: any) => ({ 'id': item.id, 'name': item.fullName }));
        this.approvalsItems = [...employes];
        this.editarAsignar(this.filesArrays);
    }

    filterParamLabel(param): void {
        return this.getLabel(param);
    }

    filterParamValue(param): void {
        return this.getParamLabel(param);
    }

    selectAutocomplte(items): void {
        const itemsSelect: any[] = [];
        items.forEach((item: any) =>
            itemsSelect.push({ id: item.id, name: item.fullName }));
        this.itemsAutoComplte = [...itemsSelect];
    }

    asignar(): void {
        const idEmployeesFilter = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
        const employees = this.elements.filter((item: any) => idEmployeesFilter.includes(item.id));
        employees.forEach((element: any, i: number) => {
            this.addDataGroup(element.id, element.fullName, element.identificationNumber, element.gender.name, element.healthcareProvider.id, element.occupationRiskManager.id);
        });
    }

    addDataGroup(empId, empName, empCedula, gender, empEPS, empARL): void {
        this.itemsAprv = this.formInit.get('data') as FormArray;
        this.deleteDataGroup();
        const data = this.formInit.get('data').value.filter((item: any) => item.id === empId);
        if (!data[0]) {
            this.itemsAprv.push(this.formData(empId, empName, empCedula, gender, empEPS, empARL));
        }
    }

    formData(empId, empName, empCedula, gender, empEPS, empARL): FormGroup {
        this.signature();
        return this._formBuilder.group({
            id: new FormControl(empId),
            employeeName: new FormControl({ value: empName, disabled: true }),
            identificationNumber: new FormControl({ value: empCedula, disabled: true }),
            gender: new FormControl({ value: gender, disabled: true }),
            createdAt: new FormControl(),
            healthcareProvider: new FormControl(  { value: empEPS, disabled: true }),
            occupationRiskManager: new FormControl( { value: empARL, disabled: true }),
            checkInTime: new FormControl(),
            checkOutTime: new FormControl()
        });
    }


    deleteDataGroup(): void {
        const idSelect = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
        const filterDelete = this.formInit.get('data').value.filter((item: any) => !idSelect.includes(item.id)).map((item: any) => item.id);
        const filterEditDelete = this.approvalsItems.filter((item: any) => !idSelect.includes(item.id)).map((item: any) => item.id);
        if (filterDelete[0] || filterDelete[0] !== undefined) {
            const index = this.formInit.get('data').value.findIndex(item => item.id === filterDelete[0]);
            const add = this.formInit.get('data') as FormArray;
            add.removeAt(index);
        }
        this.signature();
    }

    editarAsignar(...items): void {
        items[0]?.forEach((element: any, i: number) => {
            this.editDataGroup(element);
        });
    }

    getIdEmployee(id): void {
        return this.elements.filter((item: any) => item.id === id);
    }

    editDataGroup(...elements): void {
        const editItem = this.formInit.get('data') as FormArray;
        const employee = this.getIdEmployee(elements[0][0]?.id);
        editItem.push(this.formEditData(elements[0][0]?.id, employee[0]?.fullName, employee[0]?.identificationNumber,
            employee[0]?.gender?.name, elements[0][0]?.createdAt, elements[0][0]?.checkInTime, elements[0][0]?.checkOutTime,
            employee[0]?.healthcareProvider?.id, employee[0]?.occupationRiskManager?.id));
    }

    formEditData(id, name, identificationNumber, gender, createdAt, checkInTime, checkOutTime, healthcareProvider, occupationRiskManager): FormGroup {
        return this._formBuilder.group({
            id: new FormControl(id),
            employeeName: new FormControl({ value: name, disabled: true }),
            identificationNumber: new FormControl( {value: identificationNumber, disabled: true }),
            gender: new FormControl({value: gender, disabled: true }),
            createdAt: new FormControl(createdAt),
            healthcareProvider: new FormControl({value: healthcareProvider, disabled: true } ),
            occupationRiskManager: new FormControl({value: occupationRiskManager, disabled: true } ),
            checkInTime: new FormControl(checkInTime),
            checkOutTime: new FormControl(checkOutTime)
        });
    }

    getPreviewSignature(id): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '85%';
        dialogConfig.data = {
            employee: id,
            idForm: this.id
        };

        const dialog = this.matDialog.open(SignatureAssitantComponent, dialogConfig);
    }

    signature(): void{
        const form = this.formInit.value;
        form.assignedAssistants = this.formInit.value.data.map((item: any) => item.id);
    }

    submit(): void {
        this.validationSubmit();
    }
}

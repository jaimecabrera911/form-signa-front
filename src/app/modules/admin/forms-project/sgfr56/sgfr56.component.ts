/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { DatePipe } from '@angular/common';
import { Functions } from 'app/components/functions/functions';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-sgfr56',
    templateUrl: './sgfr56.component.html',
    styleUrls: ['./sgfr56.component.scss']
})
export class Sgfr56Component extends ControllerFormsComponent implements OnInit {

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
        this.getItemsTable();
    }

    validateForm(): void {
        this.formInit = this._formBuilder.group({
            code: new FormControl(this.code),
            version: new FormControl('1.0'),
            company: new FormControl(1),
            fieldsItems: this._formBuilder.group({
                place: new FormControl(''),
                compnayName: new FormControl(''),
                employee: new FormControl('', [Validators.required]),
            }),
            data: this._formBuilder.array([]),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl(),
            selectAutoComplete: new FormControl('')
        });
    }

    getItemsTable(): void {
        this.api.employeesManagerService().subscribe({
            next: (elements: any) => {
                if (elements.data) {
                    this.elements = this.function.validateResponse(elements.data);
                    this.elements.forEach((item: any) => { item.enabled ? item.enabled = 'Activo' : item.enabled = 'Inactivo'; });
                    this.selectAutocomplte(this.elements);
                    /*if (this.formId) {
                        this.getApprovalsId();
                    }*/
                }
            }, error: (e: any) => console.error(e)
        });
    }

    /*getApprovalsId(): void {
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
    }*/

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
        this.itemsAprv = this.formInit.get('data') as FormArray;
        this.deleteDataGroup();
        const data = this.formInit.get('data').value.filter((item: any) => item.employee === empId);
        if (!data[0]) {
            this.itemsAprv.push(this.formData(empId, empName));
        }
        //this.addFormValue();
    }


    deleteDataGroup(): void {
        const idSelect = this.formInit.value.selectAutoComplete.map((item: any) => item.id);
        const filterDelete = this.formInit.get('data').value.filter((item: any) => !idSelect.includes(item.employee)).map((item: any) => item.employee);
        const filterEditDelete = this.approvalsItems.filter((item: any) => !idSelect.includes(item.id)).map((item: any) => item.id);
        if (filterDelete[0] || filterDelete[0] !== undefined) {
            const index = this.formInit.get('data').value.findIndex(item => item.employee === filterDelete[0]);
            const add = this.formInit.get('data') as FormArray;
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
        const itemsAprv = this.formInit.get('data') as FormArray;
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

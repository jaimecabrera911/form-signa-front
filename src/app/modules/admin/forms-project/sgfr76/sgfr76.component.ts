import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'app/services/api.service';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { DatePipe } from '@angular/common';
import { Functions } from 'app/components/functions/functions';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-sgfr76',
    templateUrl: './sgfr76.component.html',
    styleUrls: ['./sgfr76.component.scss']
})
export class Sgfr76Component extends ControllerFormsComponent implements OnInit {

    override code = 'SG-FR-76';
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

    ngOnInit(): void {
        super.ngOnInit();
        this.validateForm();
        this.getProject();
        if (!this.id) {
            this.addDataGroup();
        }
    }

    validateForm(): void {
        this.formInit = this._formBuilder.group({
            code: new FormControl(this.code),
            version: new FormControl('1.0'),
            project: new FormControl('', [Validators.required]),
            company: new FormControl(1),
            fields: new FormArray([
                this._formBuilder.group({ name: 'workplace', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'companyName', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'workDone', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'toolsMachines', value: '', type: this.getTypeValue(1) }),
            ]),
            dataFields: this._formBuilder.array([]),
            fieldsItems: this._formBuilder.group({
                workplace: new FormControl(''),
                companyName: new FormControl(''),
                workDone: new FormControl(''),
                toolsMachines: new FormControl(''),
            }),
            data: this._formBuilder.array([]),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl(),
            selectAutoComplete: new FormControl('')
        });
    }

    override getForm(): void {
        if (this.id) {
            this.formInit.get('fieldsItems').patchValue({
                workplace: this.cleanSelect(this.getValueField('workplace')),
                companyName: this.cleanSelect(this.getValueField('companyName')),
                workDone: this.cleanSelect(this.getValueField('workDone')),
                toolsMachines: this.cleanSelect(this.getValueField('toolsMachines')),
            });
            this.editarAsignar(this.filesArrays);
        }
    }

    filterParamLabel(param): void {
        return this.getLabel(param);
    }

    filterParamValue(param): void {
        return this.getParamLabel(param);
    }


    formData(): FormGroup {
        return this._formBuilder.group({
            stepSequence: [''],
            hazards: [''],
            consequences: [''],
            controlActions: [''],
            environmentalAspect: [''],
            environmentalImpact: [''],
            environmentalControls: [''],
            responsibleComplyingControls: ['']
        });
    }

    addDataGroup(): void {
        const addItem = this.formInit.get('data') as FormArray;
        addItem.push(this.formData());
    }

    deleteDataGroup(i): void {
        const deleteItem = this.formInit.get('data') as FormArray;
        deleteItem.removeAt(i);
    }

    editarAsignar(...items): void {
        items[0]?.forEach((element: any, i: number) => {
            this.editDataGroup(element);
        });
    }

    editDataGroup(...elements): void {
        const editItem = this.formInit.get('data') as FormArray;
        editItem.push(this.formEditData(elements[0][0]?.consequences, elements[0][0]?.controlActions, elements[0][0]?.environmentalAspect,
            elements[0][0]?.environmentalControls, elements[0][0]?.environmentalImpact, elements[0][0]?.hazards,
            elements[0][0]?.responsibleComplyingControls, elements[0][0]?.stepSequence));
    }

    formEditData(consequences, controlActions, environmentalAspect, environmentalControls,
        environmentalImpact, hazards, responsibleComplyingControls, stepSequence): FormGroup {

        return this._formBuilder.group({
            stepSequence: [stepSequence],
            hazards: [hazards],
            consequences: [consequences],
            controlActions: [controlActions],
            environmentalAspect: [environmentalAspect],
            environmentalImpact: [environmentalImpact],
            environmentalControls: [environmentalControls],
            responsibleComplyingControls: [responsibleComplyingControls]
        });
    }

    submit(): void {
        this.validationSubmit();
    }
}

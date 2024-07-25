import { Assistants } from './../../../../models/assitant';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { v4 as uuidv4 } from 'uuid';
import { ControllerFormsComponent } from '../controller-forms.Component';


@Component({
    selector: 'app-sgfr08',
    templateUrl: './sgfr08.component.html',
    styleUrls: ['./sgfr08.component.scss']
})
export class SGFR08Component extends ControllerFormsComponent implements OnInit {

    override code = 'SG-FR-08';
    override id = this.activatedRouter.snapshot?.paramMap.get('id');

    constructor(protected router: Router,
        protected _formBuilder: FormBuilder,
        protected activatedRouter: ActivatedRoute,
        protected api: ApiService
    ) {
        super(_formBuilder, api);
    }

     override ngOnInit(): void {
        super.ngOnInit();
        this.validateForm();
        this.getProject();
        this.getActivityType();
        this.getPlace();
        this.getNumberPeopleInvited();
        this.getImprovementAction();
        this.getEfficacyEvaluation();
        this.getEvaluationMethod();
        this.getStartTime();
        this.getNumberPeopleAttending();
        this.getEmployees();
    }

    validateForm(): void{
        this.formInit = this._formBuilder.group({
            code: new FormControl(this.code),
            uid: new FormControl(uuidv4()),
            name: new FormControl(this.title),
            version: new FormControl('1.0'),
            company: new FormControl(1),
            fields: new FormArray([
                this._formBuilder.group({name: 'date', value: '',  type: this.getTypeValue(3)}),
                this._formBuilder.group({name: 'novetly', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'creationDate', value: '',  type: this.getTypeValue(3)}),
                this._formBuilder.group({name: 'typeActivity', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'descriptionActivity', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'nameCapacitation', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'employee', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'objetiveCapacitation', value: '',  type: this.getTypeValue(9)}),
                this._formBuilder.group({name: 'contentCapacitation', value: '',  type: this.getTypeValue(9)}),
                this._formBuilder.group({name: 'dateCapacitation', value: '',  type: this.getTypeValue(3)}),
                this._formBuilder.group({name: 'place', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'startTime', value: '',  type: this.getTypeValue(3)}),
                this._formBuilder.group({name: 'duration', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'peopleInvited', value: '',  type: this.getTypeValue(2)}),
                this._formBuilder.group({name: 'peopleAttending', value: '',  type: this.getTypeValue(2)}),
                this._formBuilder.group({name: 'percentageAttendance', value: '',  type: this.getTypeValue(2)}),
                this._formBuilder.group({name: 'methodEvaluation', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'descriptionEvaluation', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'effectivenessEvaluation', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'effectiveEvaluation', value: '',  type: this.getTypeValue(2)}),
                this._formBuilder.group({name: 'generateImprovementActionEvaluation', value: '', type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'dateFollowUpDateEvaluation', value: '',  type: this.getTypeValue(3)}),
                this._formBuilder.group({name: 'elaboratedSignature', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'approvedSignature', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'trainer', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'dateApproved', value: '',  type: this.getTypeValue(3)})
            ]),
            evidences: new FormControl([]),
            project: new FormControl('', [Validators.required]),
            assistants: new FormControl([]),
            approval: new FormControl([]),
            fieldsItems: this._formBuilder.group({
                date: new FormControl(new Date(), [Validators.required]),
                novetly: new FormControl('', [Validators.required]),
                creationDate: new FormControl('', [Validators.required]),
                typeActivity: new FormControl('', [Validators.required]),
                descriptionActivity: new FormControl(''),
                nameCapacitation: new FormControl('', [Validators.required]),
                employee: new FormControl('', [Validators.required]),
                objetiveCapacitation: new FormControl('', [Validators.required]),
                contentCapacitation: new FormControl('', [Validators.required]),
                dateCapacitation: new FormControl('', [Validators.required]),
                place: new FormControl('', [Validators.required]),
                startTime: new FormControl('', [Validators.required]),
                duration: new FormControl('', [Validators.required]),
                peopleInvited: new FormControl('', [Validators.required]),
                peopleAttending: new FormControl('', [Validators.required]),
                percentageAttendance: new FormControl('', [Validators.required]),
                methodEvaluation: new FormControl('', [Validators.required]),
                descriptionEvaluation: new FormControl(),
                effectivenessEvaluation: new FormControl('', [Validators.required]),
                effectiveEvaluation: new FormControl('', [Validators.required]),
                generateImprovementActionEvaluation: new FormControl('', [Validators.required]),
                dateFollowUpDateEvaluation: new FormControl('', [Validators.required]),
                elaboratedSignature: new FormControl(),
                approvedSignature: new FormControl(),
                trainer: new FormControl(),
                dateApproved: new FormControl()
            }),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl()
        });
    }


    override getForm(): void{
        if(this.id){
            this.formInit.get('fieldsItems').patchValue({
                date: this.cleanSelect(this.getValueField('date')),
                novetly: this.cleanSelect(this.getValueField('novetly')),
                creationDate: this.cleanSelect(this.getValueField('creationDate')),
                typeActivity: this.cleanSelect(this.getValueField('typeActivity')),
                descriptionActivity: this.cleanSelect(this.getValueField('descriptionActivity')),
                nameCapacitation: this.cleanSelect(this.getValueField('nameCapacitation')),
                employee: this.cleanSelect(this.getValueField('employee')),
                objetiveCapacitation: this.cleanSelect(this.getValueField('objetiveCapacitation')),
                contentCapacitation: this.cleanSelect(this.getValueField('contentCapacitation')),
                dateCapacitation: this.cleanSelect(this.getValueField('dateCapacitation')),
                place: this.cleanSelect(this.getValueField('place')),
                startTime: this.cleanSelect(this.getValueField('startTime')),
                duration: this.getValueField('duration'),
                peopleInvited: this.cleanSelect(this.getValueField('peopleInvited')),
                peopleAttending: this.cleanSelect(this.getValueField('peopleAttending')),
                percentageAttendance: this.cleanSelect(this.getValueField('percentageAttendance')),
                methodEvaluation: this.cleanSelect(this.getValueField('methodEvaluation')),
                descriptionEvaluation: this.getValueField('descriptionEvaluation'),
                effectivenessEvaluation: this.cleanSelect(this.getValueField('effectivenessEvaluation')),
                effectiveEvaluation: this.cleanSelect(this.getValueField('effectiveEvaluation')),
                generateImprovementActionEvaluation: this.cleanSelect(this.getValueField('generateImprovementActionEvaluation')),
                dateFollowUpDateEvaluation: this.cleanSelect(this.getValueField('dateFollowUpDateEvaluation')),
            });
        }
    }


    onSubmit(): void {
        this.validationSubmit();
    }

}

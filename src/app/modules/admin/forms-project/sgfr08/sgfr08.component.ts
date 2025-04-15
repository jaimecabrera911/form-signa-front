/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable max-len */
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { MatDialog } from '@angular/material/dialog';
import { LoginService } from 'app/services/login.service';

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
        protected matDialog: MatDialog,
        protected api: ApiService,
        protected login: LoginService,
    ) {
        super(_formBuilder, matDialog, login, api);
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
        this.getTypeCapacitation();
        this.getOptions();
    }

    validateForm(): void{
        this.formInit = this._formBuilder.group({
            code: new FormControl({ value: this.code, disabled: true }),
            uid: new FormControl(),
            name: new FormControl(this.title),
            version: new FormControl({ value:'1.0', disabled: true }),
            fields: new FormArray([
                this._formBuilder.group({name: 'novetly', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'typeActivity', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'nameCapacitation', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'typeTrainer', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'trainerName', value: '',  type: this.getTypeValue(1)}),
                this._formBuilder.group({name: 'objectiveCapacitation', value: '',  type: this.getTypeValue(9)}),
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
            projectUid: new FormControl('', [Validators.required]),
            assistants: new FormControl([]),
            approval: new FormControl([]),
            fieldsItems: this._formBuilder.group({
                novetly: new FormControl('', [Validators.required]),
                typeActivity: new FormControl('', [Validators.required]),
                nameCapacitation: new FormControl(''),
                typeTrainer: new FormControl('', [Validators.required]),
                trainerName: new FormControl('', [Validators.required]),
                objectiveCapacitation: new FormControl('', [Validators.required]),
                contentCapacitation: new FormControl('', [Validators.required]),
                dateCapacitation: new FormControl('', [Validators.required]),
                place: new FormControl('', [Validators.required]),
                startTime: new FormControl('', [Validators.required]),
                duration: new FormControl('', [Validators.required]),
                peopleInvited: new FormControl( [Validators.required]),
                peopleAttending: new FormControl( [Validators.required]),
                percentageAttendance: new FormControl({disabled: true} , [Validators.required]),
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
            status: new FormControl('created'),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl()
        });
    }


    override getForm(): void{
        if(this.id){
            this.formInit.get('fieldsItems').patchValue({
                novetly: this.cleanSelect(this.getValueField('novetly')),
                typeActivity: this.cleanSelect(this.getValueField('typeActivity')),
                nameCapacitation: this.cleanSelect(this.getValueField('nameCapacitation')),
                typeTrainer: this.cleanSelect(this.getValueField('typeTrainer')),
                trainerName: this.cleanSelect(this.getValueField('trainerName')),
                objectiveCapacitation: this.cleanSelect(this.getValueField('objectiveCapacitation')),
                contentCapacitation: this.cleanSelect(this.getValueField('contentCapacitation')),
                dateCapacitation: this.cleanSelect(this.getValueField('dateCapacitation')),
                place: this.cleanSelect(this.getValueField('place')),
                startTime: this.cleanSelect(this.getValueField('startTime')),
                duration: this.cleanSelect(this.getValueField('duration')),
                peopleInvited: this.cleanSelect(this.getValueField('peopleInvited')),
                peopleAttending: this.cleanSelect(this.getValueField('peopleAttending')),
                percentageAttendance: this.cleanSelect(this.getValueField('percentageAttendance')),
                methodEvaluation: this.cleanSelect(this.getValueField('methodEvaluation')),
                descriptionEvaluation: this.cleanSelect(this.getValueField('descriptionEvaluation')),
                effectivenessEvaluation: this.cleanSelect(this.getValueField('effectivenessEvaluation')),
                effectiveEvaluation: this.cleanSelect(this.getValueField('effectiveEvaluation')),
                generateImprovementActionEvaluation: this.cleanSelect(this.getValueField('generateImprovementActionEvaluation')),
                dateFollowUpDateEvaluation: this.cleanSelect(this.getValueField('dateFollowUpDateEvaluation')),
            });
        }
    }

    attendancePercentage($event, type): void {
        const form = this.formInit.get('fieldsItems').value;
        form.peopleInvited  = type === 'pi' ? Number($event.target.value) : form.peopleInvited;
        form.peopleAttending  = type === 'at' ? Number($event.target.value) : form.peopleAttending;
        const percentageAttendance = form.peopleAttending >=1 && form.peopleInvited >=1 ? ((form.peopleAttending / form.peopleInvited) * 100) : '0';
        if(form.peopleAttending >= 1  && form.peopleInvited >=1 && percentageAttendance){
            this.formInit.get('fieldsItems').patchValue({ percentageAttendance: percentageAttendance ? percentageAttendance : '' });
        }
    }

    filterParamLabel(param): void{
        return this.getLabel(param);
    }

    filterParamValue(param): void{
        return this.getParamLabel(param);
    }

    Submit(): void{
        this.validationSubmit();
    }
}

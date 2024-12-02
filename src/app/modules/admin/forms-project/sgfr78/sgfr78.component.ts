import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sgfr78',
  templateUrl: './sgfr78.component.html',
  styleUrls: ['./sgfr78.component.scss']
})
export class Sgfr78Component extends ControllerFormsComponent implements OnInit {

    override code = 'SG-FR-78';
    override id = this.activatedRouter.snapshot?.paramMap.get('id');
    image: any  = { 'img1': './assets/images/forms/sgfr78_1.png', 'img2': './assets/images/forms/sgfr78_2.png', 'img3': './assets/images/forms/sgfr78_3.png'};

    constructor(protected router: Router,
        protected _formBuilder: FormBuilder,
        protected activatedRouter: ActivatedRoute,
        protected matDialog: MatDialog,
        protected api: ApiService
    ) {
        super(_formBuilder, matDialog, api);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.validateForm();
        this.getStateVerification();
        this.getTypeStairs();
        this.getProject();
    }

    validateForm(): void {
        this.formInit = this._formBuilder.group({
            code: new FormControl({ value: this.code, disabled: true }),
            uid: new FormControl(),
            name: new FormControl(this.title),
            version: new FormControl({ value:'1.0', disabled: true }),
            company: new FormControl(1),
            fields: new FormArray([
                this._formBuilder.group({ name: 'location', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'numberStairs', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'height', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'strength', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'typeStairs', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'material', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'observations', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'paws', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'rails', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'step', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'topStop', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'staircaseInsurance', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hinges', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'pulley', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'stringerGuides', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'platform', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'railing', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'wheelsBrakes', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'cleaning', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'tags', value: '', type: this.getTypeValue(9) })
            ]),
            evidences: new FormControl([]),
            projectUid: new FormControl('', [Validators.required]),
            assistants: new FormControl([]),
            approval: new FormControl([]),
            fieldsItems: this._formBuilder.group({
                location: new FormControl(''),
                numberStairs: new FormControl(''),
                height: new FormControl(''),
                strength: new FormControl(''),
                typeStairs: new FormControl(''),
                material: new FormControl(''),
                observations: new FormControl(''),
                paws: new FormControl(''),
                rails: new FormControl(''),
                step: new FormControl(''),
                topStop: new FormControl(''),
                staircaseInsurance: new FormControl(''),
                hinges: new FormControl(),
                pulley: new FormControl(''),
                stringerGuides: new FormControl(),
                platform: new FormControl(''),
                railing: new FormControl(),
                wheelsBrakes: new FormControl(''),
                cleaning: new FormControl(),
                tags: new FormControl('')
            }),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl()
        });
    }

    override getForm(): void {
        if (this.id) {
            this.formInit.get('fieldsItems').patchValue({
                location: this.cleanSelect(this.getValueField('location')),
                numberStairs: this.cleanSelect(this.getValueField('numberStairs')),
                height: this.cleanSelect(this.getValueField('height')),
                strength: this.cleanSelect(this.getValueField('strength')),
                typeStairs: this.cleanSelect(this.getValueField('typeStairs')),
                material: this.cleanSelect(this.getValueField('material')),
                observations: this.cleanSelect(this.getValueField('observations')),
                paws: this.cleanSelect(this.getValueField('paws')),
                rails: this.cleanSelect(this.getValueField('rails')),
                step: this.cleanSelect(this.getValueField('step')),
                topStop: this.cleanSelect(this.getValueField('topStop')),
                staircaseInsurance: this.cleanSelect(this.getValueField('staircaseInsurance')),
                hinges: this.cleanSelect(this.getValueField('hinges')),
                pulley: this.cleanSelect(this.getValueField('pulley')),
                stringerGuides: this.cleanSelect(this.getValueField('stringerGuides')),
                platform: this.cleanSelect(this.getValueField('platform')),
                railing: this.cleanSelect(this.getValueField('railing')),
                wheelsBrakes: this.cleanSelect(this.getValueField('wheelsBrakes')),
                cleaning: this.cleanSelect(this.getValueField('cleaning')),
                tags: this.cleanSelect(this.getValueField('tags')),
            });
        }
    }

    filterParamLabel(param): void{
        return this.getLabel(param);
    }

    filterParamValue(param): void{
        return this.getParamLabel(param);
    }

    onSubmit(): void {
        this.validationSubmit();
    }
}

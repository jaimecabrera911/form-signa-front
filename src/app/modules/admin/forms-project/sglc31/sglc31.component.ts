import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-sglc31',
    templateUrl: './sglc31.component.html',
    styleUrls: ['./sglc31.component.scss']
})
export class Sglc31Component extends ControllerFormsComponent implements OnInit {

    override code = 'SG-LC-31';
    override id = this.activatedRouter.snapshot?.paramMap.get('id');
    image: string  = './assets/images/forms/sglc31.png';

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
        this.getProject();
        this.getEmployees();
    }

    validateForm(): void {
        this.formInit = this._formBuilder.group({
            code: new FormControl(this.code),
            uid: new FormControl(),
            name: new FormControl(this.title),
            version: new FormControl('1.0'),
            company: new FormControl(1),
            fields: new FormArray([
                this._formBuilder.group({ name: 'contractor', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'employee', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'inspectionDate', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'workplace', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'descriptionOfWork', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'certifiedScaffolding', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'certifiedScaffoldingObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'allPartsScaffolding', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'allPartsScaffoldingObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'baseScaffoldingLeveled', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'baseScaffoldingLeveledObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'haveDockingStation', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'haveDockingStationObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'haveWheelsForRide', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'haveWheelsForRideObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'haveSecurityPins', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'haveSecurityPinsObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'accessPlatformsGoodUse', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'accessPlatformsGoodUseObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'structureAdequatelyAssembledSec', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'structureAdequatelyAssembledSecObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'scaffoldingAttachedStableS', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'scaffoldingAttachedStableSObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'haveSkirtingBoards', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'haveSkirtingBoardsObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'haveAccessStairs', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'haveAccessStairsObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'haveScaffoldErectersCertificate', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'haveScaffoldErectersCertificateObser', value: '', type: this.getTypeValue(9) }),
                this._formBuilder.group({ name: 'haveScaffoldingUsageCards', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'haveScaffoldingUsageCardsObser', value: '', type: this.getTypeValue(9) })
            ]),
            evidences: new FormControl([]),
            project: new FormControl('', [Validators.required]),
            assistants: new FormControl([]),
            approval: new FormControl([]),
            fieldsItems: this._formBuilder.group({
                contractor: new FormControl(''),
                employee: new FormControl(''),
                inspectionDate: new FormControl(''),
                workplace: new FormControl(''),
                descriptionOfWork: new FormControl(''),
                certifiedScaffolding: new FormControl(),
                certifiedScaffoldingObser: new FormControl(''),
                allPartsScaffolding: new FormControl(),
                allPartsScaffoldingObser: new FormControl(''),
                baseScaffoldingLeveled: new FormControl(),
                baseScaffoldingLeveledObser: new FormControl(''),
                haveDockingStation: new FormControl(),
                haveDockingStationObser: new FormControl(''),
                haveWheelsForRide: new FormControl(),
                haveWheelsForRideObser: new FormControl(''),
                haveSecurityPins: new FormControl(),
                haveSecurityPinsObser: new FormControl(''),
                accessPlatformsGoodUse: new FormControl(),
                accessPlatformsGoodUseObser: new FormControl(''),
                structureAdequatelyAssembledSec: new FormControl(),
                structureAdequatelyAssembledSecObser: new FormControl(''),
                scaffoldingAttachedStableS : new FormControl(),
                scaffoldingAttachedStableSObser: new FormControl(),
                haveSkirtingBoards: new FormControl(),
                haveSkirtingBoardsObser: new FormControl(''),
                haveAccessStairs: new FormControl(),
                haveAccessStairsObser: new FormControl(''),
                haveScaffoldErectersCertificate: new FormControl(),
                haveScaffoldErectersCertificateObser: new FormControl(''),
                haveScaffoldingUsageCards: new FormControl(),
                haveScaffoldingUsageCardsObser: new FormControl('')
            }),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl()
        });
    }

    override getForm(): void {
        if (this.id) {
            this.formInit.get('fieldsItems').patchValue({
                contractor: this.cleanSelect(this.getValueField('contractor')),
                employee: this.cleanSelect(this.getValueField('employee')),
                inspectionDate: this.cleanSelect(this.getValueField('inspectionDate')),
                workplace: this.cleanSelect(this.getValueField('workplace')),
                descriptionOfWork: this.cleanSelect(this.getValueField('descriptionOfWork')),
                certifiedScaffolding: this.cleanSelect(this.getValueField('certifiedScaffolding')),
                certifiedScaffoldingObser: this.cleanSelect(this.getValueField('certifiedScaffcertifiedScaffoldingObserolding')),
                allPartsScaffolding: this.cleanSelect(this.getValueField('allPartsScaffolding')),
                allPartsScaffoldingObser: this.cleanSelect(this.getValueField('allPartsScaffoldingObser')),
                baseScaffoldingLeveled: this.cleanSelect(this.getValueField('baseScaffoldingLeveled')),
                baseScaffoldingLeveledObser: this.cleanSelect(this.getValueField('baseScaffoldingLeveledObser')),
                haveDockingStation: this.cleanSelect(this.getValueField('haveDockingStation')),
                haveDockingStationObser: this.cleanSelect(this.getValueField('haveDockingStationObser')),
                haveWheelsForRide: this.cleanSelect(this.getValueField('haveWheelsForRide')),
                haveWheelsForRideObser: this.cleanSelect(this.getValueField('haveWheelsForRideObser')),
                haveSecurityPins: this.cleanSelect(this.getValueField('haveSecurityPins')),
                haveSecurityPinsObser: this.cleanSelect(this.getValueField('haveSecurityPinsObser')),
                accessPlatformsGoodUse: this.cleanSelect(this.getValueField('accessPlatformsGoodUse')),
                accessPlatformsGoodUseObser: this.cleanSelect(this.getValueField('accessPlatformsGoodUseObser')),
                structureAdequatelyAssembledSec: this.cleanSelect(this.getValueField('structureAdequatelyAssembledSec')),
                structureAdequatelyAssembledSecObser: this.cleanSelect(this.getValueField('structureAdequatelyAssembledSecObser')),
                scaffoldingAttachedStableS: this.cleanSelect(this.getValueField('scaffoldingAttachedStableS')),
                scaffoldingAttachedStableSObser: this.cleanSelect(this.getValueField('scaffoldingAttachedStableSObser')),
                haveSkirtingBoards: this.cleanSelect(this.getValueField('haveSkirtingBoards')),
                haveSkirtingBoardsObser: this.cleanSelect(this.getValueField('haveSkirtingBoardsObser')),
                haveAccessStairs: this.cleanSelect(this.getValueField('haveAccessStairs')),
                haveAccessStairsObser: this.cleanSelect(this.getValueField('haveAccessStairsObser')),
                haveScaffoldErectersCertificate: this.cleanSelect(this.getValueField('haveScaffoldErectersCertificate')),
                haveScaffoldErectersCertificateObser: this.cleanSelect(this.getValueField('haveScaffoldErectersCertificateObser')),
                haveScaffoldingUsageCards: this.cleanSelect(this.getValueField('haveScaffoldingUsageCards')),
                haveScaffoldingUsageCardsObser: this.cleanSelect(this.getValueField('haveScaffoldingUsageCardsObser')),
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

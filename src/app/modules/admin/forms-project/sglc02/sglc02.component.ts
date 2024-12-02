import { Component, OnInit } from '@angular/core';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'app-sglc02',
    templateUrl: './sglc02.component.html',
    styleUrls: ['./sglc02.component.scss']
})
export class Sglc02Component extends ControllerFormsComponent implements OnInit {

    override code = 'SG-LC-02';
    override id = this.activatedRouter.snapshot?.paramMap.get('id');

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
        this.getState();
        this.getEmployees();
    }

    validateForm(): void {
        this.formInit = this._formBuilder.group({
            code: new FormControl({ value: this.code, disabled: true }),
            uid: new FormControl(),
            name: new FormControl(this.title),
            version: new FormControl({ value:'1.0', disabled: true }),
            company: new FormControl(1),
            fields: new FormArray([
                this._formBuilder.group({ name: 'firstAidKitLocation', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'firstAidKitCode', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'plasticBagCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'plasticBagApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'plasticBagObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'antisepticAlcoholCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'antisepticAlcoholApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'antisepticAlcoholObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'cottonCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'cottonApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'cottonObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'applicatorsCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'applicatorsApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'aapplicatorsObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'gauzeDressingsCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'gauzeDressingsApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'pgauzeDressingsObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'tongueDepressorCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'tongueDepressorApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'tongueDepressorObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'slingCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'slingApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'slingObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'curesCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'curesApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'curesObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'stickingPlasterCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'stickingPlasterApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'stickingPlasterObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'antisepticGauzeCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'antisepticGauzeApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'antisepticGauzeObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'disposableGlovesCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'disposableGlovesApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'disposableGlovesObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'neckImmobilizerCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'neckImmobilizerApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'neckImmobilizerObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'isodineSolutionCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'isodineSolutionApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'isodineSolutionObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'isodineFoamCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'isodineFoamApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'isodineFoamObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'disposableSyringesCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'disposableSyringesApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'disposableSyringesObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'limbImmobilizerKitCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'limbImmobilizerKitApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'limbImmobilizerKitObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'notebookCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'notebookApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'notebookObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'flashlightCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'flashlightApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'flashlightObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'firstAidManualCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'firstAidManualApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'firstAidManualObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'maskCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'maskApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'maskObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'eyePatchCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'eyePatchApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eyePatchObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'salineSolutionCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'salineSolutionApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'salineSolutionObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'whistleCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'whistleApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'whistleObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'faceMaskCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'faceMaskApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'faceMaskObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'scissorsCant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'scissorsApproved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'scissorsObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'elasticBandage6Cant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'elasticBandage6Approved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'elasticBandage6Observations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'elasticBandage2Cant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'elasticBandage2Approved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'elasticBandage2Observations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'elasticBandage4Cant', value: '', type: this.getTypeValue(2) }),
                this._formBuilder.group({ name: 'elasticBandage4Approved', value: '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'elasticBandage4Observations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'tieDownStrapsState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'tieDownStrapsObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'signalingState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'signalingObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'locationState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'locationObservations', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'generalConditionState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'generalConditionObserv', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'orderCleanlinessState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'orderCleanlinessObserv', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'locationSignageState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'locationSignageObserv', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'presenceExpiredItemsState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'presenceExpiredItemsObserv', value: '', type: this.getTypeValue(9) }),

                this._formBuilder.group({ name: 'presenceMedicationsState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'presenceMedicationsObserv', value: '', type: this.getTypeValue(9) })
            ]),
            evidences: new FormControl([]),
            projectUid: new FormControl('', [Validators.required]),
            assistants: new FormControl([]),
            approval: new FormControl([]),
            fieldsItems: this._formBuilder.group({
                firstAidKitLocation: new FormControl('', [Validators.required]),
                firstAidKitCode: new FormControl('', [Validators.required]),

                plasticBagObservations: new FormControl(''),
                plasticBagCant: new FormControl(''),
                plasticBagApproved: new FormControl(),

                antisepticAlcoholCant: new FormControl(''),
                antisepticAlcoholApproved: new FormControl(),
                antisepticAlcoholObservations: new FormControl(''),

                cottonCant: new FormControl(''),
                cottonApproved: new FormControl(),
                cottonObservations: new FormControl(''),

                applicatorsCant: new FormControl(''),
                applicatorsApproved: new FormControl(),
                aapplicatorsObservations: new FormControl(''),

                gauzeDressingsCant: new FormControl(''),
                gauzeDressingsApproved: new FormControl(),
                pgauzeDressingsObservations: new FormControl(''),

                tongueDepressorCant: new FormControl(''),
                tongueDepressorApproved: new FormControl(),
                tongueDepressorObservations: new FormControl(''),

                slingCant: new FormControl(''),
                slingApproved: new FormControl(),
                slingObservations: new FormControl(''),

                curesCant: new FormControl(''),
                curesApproved: new FormControl(),
                curesObservations: new FormControl(''),

                stickingPlasterCant: new FormControl(''),
                stickingPlasterApproved: new FormControl(),
                stickingPlasterObservations: new FormControl(''),

                antisepticGauzeCant: new FormControl(''),
                antisepticGauzeApproved: new FormControl(),
                antisepticGauzeObservations: new FormControl(''),

                disposableGlovesCant: new FormControl(''),
                disposableGlovesApproved: new FormControl(),
                disposableGlovesObservations: new FormControl(''),

                neckImmobilizerCant: new FormControl(''),
                neckImmobilizerApproved: new FormControl(),
                neckImmobilizerObservations: new FormControl(''),

                isodineSolutionCant: new FormControl(''),
                isodineSolutionApproved: new FormControl(),
                isodineSolutionObservations: new FormControl(''),

                isodineFoamCant: new FormControl(''),
                isodineFoamApproved: new FormControl(),
                isodineFoamObservations: new FormControl(''),

                disposableSyringesCant: new FormControl(''),
                disposableSyringesApproved: new FormControl(),
                disposableSyringesObservations: new FormControl(''),

                limbImmobilizerKitCant: new FormControl(''),
                limbImmobilizerKitApproved: new FormControl(),
                limbImmobilizerKitObservations: new FormControl(''),

                notebookCant: new FormControl(''),
                notebookApproved: new FormControl(),
                notebookObservations: new FormControl(''),

                flashlightCant: new FormControl(''),
                flashlightApproved: new FormControl(),
                flashlightObservations: new FormControl(''),

                firstAidManualCant: new FormControl(''),
                firstAidManualApproved: new FormControl(),
                firstAidManualObservations: new FormControl(''),

                maskCant: new FormControl(''),
                maskApproved: new FormControl(),
                maskObservations: new FormControl(''),

                eyePatchCant: new FormControl(''),
                eyePatchApproved: new FormControl(),
                eyePatchObservations: new FormControl(''),

                salineSolutionCant: new FormControl(''),
                salineSolutionApproved: new FormControl(),
                salineSolutionObservations: new FormControl(''),

                whistleCant: new FormControl(''),
                whistleApproved: new FormControl(),
                whistleObservations: new FormControl(''),

                faceMaskCant: new FormControl(''),
                faceMaskApproved: new FormControl(),
                faceMaskObservations: new FormControl(''),

                scissorsCant: new FormControl(''),
                scissorsApproved: new FormControl(),
                scissorsObservations: new FormControl(''),

                elasticBandage6Cant: new FormControl(''),
                elasticBandage6Approved: new FormControl(),
                elasticBandage6Observations: new FormControl(''),

                elasticBandage2Cant: new FormControl(''),
                elasticBandage2Approved: new FormControl(),
                elasticBandage2Observations: new FormControl(''),

                elasticBandage4Cant: new FormControl(''),
                elasticBandage4Approved: new FormControl(),
                elasticBandage4Observations: new FormControl(''),

                tieDownStrapsState: new FormControl(''),
                tieDownStrapsObservations: new FormControl(''),

                signalingState: new FormControl(''),
                signalingObservations: new FormControl(''),

                locationState: new FormControl(''),
                locationObservations: new FormControl(''),

                generalConditionState: new FormControl(''),
                generalConditionObserv: new FormControl(''),

                orderCleanlinessState: new FormControl(''),
                orderCleanlinessObserv: new FormControl(''),

                locationSignageState: new FormControl(''),
                locationSignageObserv: new FormControl(''),

                presenceExpiredItemsState: new FormControl(''),
                presenceExpiredItemsObserv: new FormControl(''),

                presenceMedicationsState: new FormControl(''),
                presenceMedicationsObserv: new FormControl('')
            }),
            filesUpload: new FormControl(),
            assignedAssistants: new FormControl(),
            trainingApproval: new FormControl()
        });
    }

    override getForm(): void{
        if(this.id){
            this.formInit.get('fieldsItems').patchValue({
                firstAidKitLocation: this.cleanSelect(this.getValueField('firstAidKitLocation')),
                firstAidKitCode: this.cleanSelect(this.getValueField('firstAidKitCode')),

                plasticBagCant: this.cleanSelect(this.getValueField('plasticBagCant')),
                plasticBagApproved: this.cleanSelect(this.getValueField('plasticBagApproved')),
                plasticBagObservations: this.cleanSelect(this.getValueField('plasticBagObservations')),

                antisepticAlcoholCant: this.cleanSelect(this.getValueField('antisepticAlcoholCant')),
                antisepticAlcoholApproved: this.cleanSelect(this.getValueField('antisepticAlcoholApproved')),
                antisepticAlcoholObservations: this.cleanSelect(this.getValueField('antisepticAlcoholObservations')),

                cottonCant: this.cleanSelect(this.getValueField('cottonCant')),
                cottonApproved: this.cleanSelect(this.getValueField('cottonApproved')),
                cottonObservations: this.cleanSelect(this.getValueField('cottonObservations')),

                applicatorsCant: this.cleanSelect(this.getValueField('applicatorsCant')),
                applicatorsApproved: this.cleanSelect(this.getValueField('applicatorsApproved')),
                aapplicatorsObservations: this.cleanSelect(this.getValueField('aapplicatorsObservations')),

                gauzeDressingsCant: this.cleanSelect(this.getValueField('gauzeDressingsCant')),
                gauzeDressingsApproved: this.cleanSelect(this.getValueField('gauzeDressingsApproved')),
                pgauzeDressingsObservations: this.cleanSelect(this.getValueField('pgauzeDressingsObservations')),

                tongueDepressorCant: this.cleanSelect(this.getValueField('tongueDepressorCant')),
                tongueDepressorApproved: this.cleanSelect(this.getValueField('tongueDepressorApproved')),
                tongueDepressorObservations: this.cleanSelect(this.getValueField('tongueDepressorObservations')),

                slingCant: this.cleanSelect(this.getValueField('slingCant')),
                slingApproved: this.cleanSelect(this.getValueField('slingApproved')),
                slingObservations: this.cleanSelect(this.getValueField('slingObservations')),

                curesCant: this.cleanSelect(this.getValueField('curesCant')),
                curesApproved: this.cleanSelect(this.getValueField('curesApproved')),
                curesObservations: this.cleanSelect(this.getValueField('curesObservations')),

                stickingPlasterCant: this.cleanSelect(this.getValueField('stickingPlasterCant')),
                stickingPlasterApproved: this.cleanSelect(this.getValueField('stickingPlasterApproved')),
                stickingPlasterObservations: this.cleanSelect(this.getValueField('stickingPlasterObservations')),

                antisepticGauzeCant: this.cleanSelect(this.getValueField('antisepticGauzeCant')),
                antisepticGauzeApproved: this.cleanSelect(this.getValueField('antisepticGauzeApproved')),
                antisepticGauzeObservations: this.cleanSelect(this.getValueField('antisepticGauzeObservations')),

                disposableGlovesCant: this.cleanSelect(this.getValueField('disposableGlovesCant')),
                disposableGlovesApproved: this.cleanSelect(this.getValueField('disposableGlovesApproved')),
                disposableGlovesObservations: this.cleanSelect(this.getValueField('disposableGlovesObservations')),

                neckImmobilizerCant: this.cleanSelect(this.getValueField('neckImmobilizerCant')),
                neckImmobilizerApproved: this.cleanSelect(this.getValueField('neckImmobilizerApproved')),
                neckImmobilizerObservations: this.cleanSelect(this.getValueField('neckImmobilizerObservations')),

                isodineSolutionCant: this.cleanSelect(this.getValueField('isodineSolutionCant')),
                isodineSolutionApproved: this.cleanSelect(this.getValueField('isodineSolutionApproved')),
                isodineSolutionObservations: this.cleanSelect(this.getValueField('isodineSolutionObservations')),

                isodineFoamCant: this.cleanSelect(this.getValueField('isodineFoamCant')),
                isodineFoamApproved: this.cleanSelect(this.getValueField('isodineFoamApproved')),
                isodineFoamObservations: this.cleanSelect(this.getValueField('isodineFoamObservations')),

                disposableSyringesCant: this.cleanSelect(this.getValueField('disposableSyringesCant')),
                disposableSyringesApproved: this.cleanSelect(this.getValueField('disposableSyringesApproved')),
                disposableSyringesObservations: this.cleanSelect(this.getValueField('disposableSyringesObservations')),

                limbImmobilizerKitCant: this.cleanSelect(this.getValueField('limbImmobilizerKitCant')),
                limbImmobilizerKitApproved: this.cleanSelect(this.getValueField('limbImmobilizerKitApproved')),
                limbImmobilizerKitObservations: this.cleanSelect(this.getValueField('limbImmobilizerKitObservations')),

                notebookCant: this.cleanSelect(this.getValueField('notebookCant')),
                notebookApproved: this.cleanSelect(this.getValueField('notebookApproved')),
                notebookObservations: this.cleanSelect(this.getValueField('notebookObservations')),

                flashlightCant: this.cleanSelect(this.getValueField('flashlightCant')),
                flashlightApproved: this.cleanSelect(this.getValueField('flashlightApproved')),
                flashlightObservations: this.cleanSelect(this.getValueField('flashlightObservations')),

                firstAidManualCant: this.cleanSelect(this.getValueField('firstAidManualCant')),
                firstAidManualApproved: this.cleanSelect(this.getValueField('firstAidManualApproved')),
                firstAidManualObservations: this.cleanSelect(this.getValueField('firstAidManualObservations')),

                maskCant: this.cleanSelect(this.getValueField('maskCant')),
                maskApproved: this.cleanSelect(this.getValueField('maskApproved')),
                maskObservations: this.cleanSelect(this.getValueField('maskObservations')),

                eyePatchCant: this.cleanSelect(this.getValueField('eyePatchCant')),
                eyePatchApproved: this.cleanSelect(this.getValueField('eyePatchApproved')),
                eyePatchObservations: this.cleanSelect(this.getValueField('eyePatchObservations')),

                salineSolutionCant: this.cleanSelect(this.getValueField('salineSolutionCant')),
                salineSolutionApproved: this.cleanSelect(this.getValueField('salineSolutionApproved')),
                salineSolutionObservations: this.cleanSelect(this.getValueField('salineSolutionObservations')),

                whistleCant: this.cleanSelect(this.getValueField('whistleCant')),
                whistleApproved: this.cleanSelect(this.getValueField('whistleApproved')),
                whistleObservations: this.cleanSelect(this.getValueField('whistleObservations')),

                faceMaskCant: this.cleanSelect(this.getValueField('faceMaskCant')),
                faceMaskApproved: this.cleanSelect(this.getValueField('faceMaskApproved')),
                faceMaskObservations: this.cleanSelect(this.getValueField('faceMaskObservations')),

                scissorsCant: this.cleanSelect(this.getValueField('scissorsCant')),
                scissorsApproved: this.cleanSelect(this.getValueField('scissorsApproved')),
                scissorsObservations: this.cleanSelect(this.getValueField('scissorsObservations')),

                elasticBandage6Cant: this.cleanSelect(this.getValueField('elasticBandage6Cant')),
                elasticBandage6Approved: this.cleanSelect(this.getValueField('elasticBandage6Approved')),
                elasticBandage6Observations: this.cleanSelect(this.getValueField('elasticBandage6Observations')),

                elasticBandage2Cant: this.cleanSelect(this.getValueField('elasticBandage2Cant')),
                elasticBandage2Approved: this.cleanSelect(this.getValueField('elasticBandage2Approved')),
                elasticBandage2Observations: this.cleanSelect(this.getValueField('elasticBandage2Observations')),

                elasticBandage4Cant: this.cleanSelect(this.getValueField('elasticBandage4Cant')),
                elasticBandage4Approved: this.cleanSelect(this.getValueField('elasticBandage4Approved')),
                elasticBandage4Observations: this.cleanSelect(this.getValueField('elasticBandage4Observations')),

                tieDownStrapsState: this.cleanSelect(this.getValueField('tieDownStrapsState')),
                tieDownStrapsObservations: this.cleanSelect(this.getValueField('tieDownStrapsObservations')),

                signalingState: this.cleanSelect(this.getValueField('signalingState')),
                signalingObservations: this.cleanSelect(this.getValueField('signalingObservations')),

                locationState: this.cleanSelect(this.getValueField('locationState')),
                locationObservations: this.cleanSelect(this.getValueField('locationObservations')),

                generalConditionState: this.cleanSelect(this.getValueField('generalConditionState')),
                generalConditionObserv: this.cleanSelect(this.getValueField('generalConditionObserv')),

                orderCleanlinessState: this.cleanSelect(this.getValueField('orderCleanlinessState')),
                orderCleanlinessObserv: this.cleanSelect(this.getValueField('orderCleanlinessObserv')),

                locationSignageState: this.cleanSelect(this.getValueField('locationSignageState')),
                locationSignageObserv: this.cleanSelect(this.getValueField('locationSignageObserv')),

                presenceExpiredItemsState: this.cleanSelect(this.getValueField('presenceExpiredItemsState')),
                presenceExpiredItemsObserv: this.cleanSelect(this.getValueField('presenceExpiredItemsObserv')),

                presenceMedicationsState: this.cleanSelect(this.getValueField('presenceMedicationsState')),
                presenceMedicationsObserv: this.cleanSelect(this.getValueField('presenceMedicationsObserv'))
            });
            console.log(this.formInit.value);
        }
    }

    filterParamLabel(param): void {
        return this.getLabel(param);
    }

    filterParamValue(param): void {
        return this.getParamLabel(param);
    }

    onSubmit(): void {
        this.validationSubmit();
    }


}

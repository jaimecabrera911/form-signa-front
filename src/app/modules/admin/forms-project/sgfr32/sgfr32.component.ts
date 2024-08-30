import { Component, OnInit } from '@angular/core';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { v4 as uuidv4 } from 'uuid';
import { MatDialog } from '@angular/material/dialog';
@Component({
    selector: 'app-sgfr32',
    templateUrl: './sgfr32.component.html',
    styleUrls: ['./sgfr32.component.scss']
})
export class Sgfr32Component extends ControllerFormsComponent implements OnInit {

    override code = 'SG-FR-32';
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
        this.getState2();
        this.getState3();
        this.getTypeWork();
        this.getAccessSystem();
        this.getEmployees();
    }

    validateForm(): void {
        this.formInit = this._formBuilder.group({
            code: new FormControl(this.code),
            uid: new FormControl(''),
            name: new FormControl(this.title),
            version: new FormControl('1.0'),
            company: new FormControl(1),
            fields: new FormArray([
                this._formBuilder.group({ name: 'typeWork', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'typeWorkOther', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'workplace', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'workDescriptionProcedure', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'toolsUse', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'estimateWorkTimeStart', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'estimateWorkTimeEnd', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'approximateHeight', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'mcpDelimitationArea', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mcpAreaSignage', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mcpWarningLine', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mcpSafetyRaillings', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mcpHandlingUnevennessGaps', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mcpSecurityAssitant', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapFixedAnchorPoint', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapPortableAnchoringDevices', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapHorizontalLifelinePF', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapVerticalLifelinesPF', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapSafetyHooks', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapCarabiners', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapFallRestraintConnectors', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapPositioningConnectors', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapFallArrestConnectors', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapSlingsWithEnergyAbsorber', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapSelfRetractingLifelines', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapVerticalTransitConnectors', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapBrakesFixedLifelines', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'mapBrakesPortableLifelines', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'eppHelmetChinStrap', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppFaceProtection', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppSafetyBoots', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppHearingProtection', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppOrganicVaporMask', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppTyvekSuit', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppSafetyGlasses', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppGloves', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'eppRespiratoryProtection', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'accessSystem', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'accessSystemOther', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'accessSystemStatus', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'aaj21Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'aaj21Question2', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'aaj21Question3', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'aaj21Question4', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'aaj21Question5', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'aaj21Question6', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'aaj21Question7', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'aaj21Question8', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'wh22Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wh22Question2', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wh22Question3', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'wh22Question4', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wh22Question5', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wh22Question6', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'wh22Question7', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wh22Question8', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wh22Question9', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'wh22Question10', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wh22Question11', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wet23Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wet23Question2', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wet23Question3', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wet23Question4', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wet23Question5', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'lml24Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question2', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question3', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question4', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question5', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question6', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question7', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question8', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question9', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'lml24Question10', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'hw25Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question2', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question3', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question4', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question5', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question6', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question7', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question8', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'hw25Question9', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'ew26Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'ew26Question2', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'ew26Question3', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'we27Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'we27Question2', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'we27Question3', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'we27Question4', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'we27Question5', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'wcs28Question1', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wcs28Question2', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wcs28Question3', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wcs28Question4', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wcs28Question5', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wcs28Question6', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'wcs28Question7', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'coordinatorHeights', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'presenceExpiredItemsObserv', value: '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'presenceMedicationsState', value: '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'presenceMedicationsObserv', value: '', type: this.getTypeValue(1) })
            ]),
            evidences: new FormControl([]),
            project: new FormControl('', [Validators.required]),
            assistants: new FormControl([]),
            approval: new FormControl([]),
            fieldsItems: this._formBuilder.group({
                typeWork: new FormControl(''),
                typeWorkOther: new FormControl(''),

                workplace: new FormControl(''),
                workDescriptionProcedure: new FormControl(''),
                toolsUse: new FormControl(''),
                estimateWorkTimeStart: new FormControl(''),
                estimateWorkTimeEnd: new FormControl(''),
                approximateHeight: new FormControl(''),

                mcpDelimitationArea: new FormControl(''),
                mcpWarningLine: new FormControl(''),
                mcpHandlingUnevennessGaps: new FormControl(''),
                mcpAreaSignage: new FormControl(''),
                mcpSafetyRaillings: new FormControl(''),
                mcpSecurityAssitant: new FormControl(''),

                mapFixedAnchorPoint: new FormControl(''),
                mapPortableAnchoringDevices: new FormControl(''),
                mapHorizontalLifelinePF: new FormControl(''),
                mapVerticalLifelinesPF: new FormControl(''),
                mapSafetyHooks: new FormControl(''),
                mapCarabiners: new FormControl(''),
                mapFallRestraintConnectors: new FormControl(''),
                mapPositioningConnectors: new FormControl(''),
                mapFallArrestConnectors: new FormControl(''),
                mapSlingsWithEnergyAbsorber: new FormControl(''),
                mapSelfRetractingLifelines: new FormControl(''),
                mapVerticalTransitConnectors: new FormControl(''),
                mapBrakesFixedLifelines: new FormControl(''),
                mapBrakesPortableLifelines: new FormControl(''),

                eppHelmetChinStrap: new FormControl(''),
                eppFaceProtection: new FormControl(''),
                eppSafetyBoots: new FormControl(''),
                eppHearingProtection: new FormControl(''),
                eppOrganicVaporMask: new FormControl(''),
                eppTyvekSuit: new FormControl(''),
                eppSafetyGlasses: new FormControl(''),
                eppGloves: new FormControl(''),
                eppRespiratoryProtection: new FormControl(''),

                accessSystem: new FormControl(''),
                accessSystemOther: new FormControl(''),
                accessSystemStatus: new FormControl(''),


                aaj21Question1: new FormControl(''),
                aaj21Question2: new FormControl(''),
                aaj21Question3: new FormControl(''),
                aaj21Question4: new FormControl(''),
                aaj21Question5: new FormControl(''),
                aaj21Question6: new FormControl(''),
                aaj21Question7: new FormControl(''),
                aaj21Question8: new FormControl(''),

                wh22Question1: new FormControl(''),
                wh22Question2: new FormControl(''),
                wh22Question3: new FormControl(''),
                wh22Question4: new FormControl(''),
                wh22Question5: new FormControl(''),
                wh22Question6: new FormControl(''),
                wh22Question7: new FormControl(''),
                wh22Question8: new FormControl(''),
                wh22Question9: new FormControl(''),
                wh22Question10: new FormControl(''),
                wh22Question11: new FormControl(''),

                wet23Question1: new FormControl(''),
                wet23Question2: new FormControl(''),
                wet23Question3: new FormControl(''),
                wet23Question4: new FormControl(''),
                wet23Question5: new FormControl(''),

                lml24Question1: new FormControl(''),
                lml24Question2: new FormControl(''),
                lml24Question3: new FormControl(''),
                lml24Question4: new FormControl(''),
                lml24Question5: new FormControl(''),
                lml24Question6: new FormControl(''),
                lml24Question7: new FormControl(''),
                lml24Question8: new FormControl(''),
                lml24Question9: new FormControl(''),
                lml24Question10: new FormControl(''),

                hw25Question1: new FormControl(''),
                hw25Question2: new FormControl(''),
                hw25Question3: new FormControl(''),
                hw25Question4: new FormControl(''),
                hw25Question5: new FormControl(''),
                hw25Question6: new FormControl(''),
                hw25Question7: new FormControl(''),
                hw25Question8: new FormControl(''),
                hw25Question9: new FormControl(''),

                ew26Question1: new FormControl(''),
                ew26Question2: new FormControl(''),
                ew26Question3: new FormControl(''),

                we27Question1: new FormControl(''),
                we27Question2: new FormControl(''),
                we27Question3: new FormControl(''),
                we27Question4: new FormControl(''),
                we27Question5: new FormControl(''),

                wcs28Question1: new FormControl(''),
                wcs28Question2: new FormControl(''),
                wcs28Question3: new FormControl(''),
                wcs28Question4: new FormControl(''),
                wcs28Question5: new FormControl(''),
                wcs28Question6: new FormControl(''),
                wcs28Question7: new FormControl(''),

                coordinatorHeights: new FormControl(''),
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
                typeWork: this.cleanSelect(this.getValueField('typeWork')),
                typeWorkOther: this.cleanSelect(this.getValueField('typeWorkOther')),
                workplace: this.cleanSelect(this.getValueField('workplace')),
                workDescriptionProcedure: this.cleanSelect(this.getValueField('workDescriptionProcedure')),
                toolsUse: this.cleanSelect(this.getValueField('toolsUse')),
                estimateWorkTimeStart: this.cleanSelect(this.getValueField('estimateWorkTimeStart')),
                estimateWorkTimeEnd: this.cleanSelect(this.getValueField('estimateWorkTimeEnd')),
                approximateHeight: this.cleanSelect(this.getValueField('approximateHeight')),

                mcpDelimitationArea: this.cleanSelect(this.getValueField('mcpDelimitationArea')),
                mcpAreaSignage: this.cleanSelect(this.getValueField('mcpAreaSignage')),
                mcpWarningLine: this.cleanSelect(this.getValueField('mcpWarningLine')),
                mcpSafetyRaillings: this.cleanSelect(this.getValueField('mcpSafetyRaillings')),
                mcpHandlingUnevennessGaps: this.cleanSelect(this.getValueField('mcpHandlingUnevennessGaps')),
                mcpSecurityAssitant: this.cleanSelect(this.getValueField('mcpSecurityAssitant')),
                mapFixedAnchorPoint: this.cleanSelect(this.getValueField('mapFixedAnchorPoint')),
                mapPortableAnchoringDevices: this.cleanSelect(this.getValueField('mapPortableAnchoringDevices')),
                mapHorizontalLifelinePF: this.cleanSelect(this.getValueField('mapHorizontalLifelinePF')),
                mapVerticalLifelinesPF: this.cleanSelect(this.getValueField('mapVerticalLifelinesPF')),
                mapSafetyHooks: this.cleanSelect(this.getValueField('mapSafetyHooks')),
                mapCarabiners: this.cleanSelect(this.getValueField('mapCarabiners')),
                mapFallRestraintConnectors: this.cleanSelect(this.getValueField('mapFallRestraintConnectors')),
                mapPositioningConnectors: this.cleanSelect(this.getValueField('mapPositioningConnectors')),
                mapFallArrestConnectors: this.cleanSelect(this.getValueField('mapFallArrestConnectors')),
                mapSlingsWithEnergyAbsorber: this.cleanSelect(this.getValueField('mapSlingsWithEnergyAbsorber')),
                mapSelfRetractingLifelines: this.cleanSelect(this.getValueField('mapSelfRetractingLifelines')),
                mapVerticalTransitConnectors: this.cleanSelect(this.getValueField('mapVerticalTransitConnectors')),
                mapBrakesFixedLifelines: this.cleanSelect(this.getValueField('mapBrakesFixedLifelines')),
                mapBrakesPortableLifelines: this.cleanSelect(this.getValueField('mapBrakesPortableLifelines')),

                eppHelmetChinStrap: this.cleanSelect(this.getValueField('eppHelmetChinStrap')),
                eppFaceProtection: this.cleanSelect(this.getValueField('eppFaceProtection')),
                eppSafetyBoots: this.cleanSelect(this.getValueField('eppSafetyBoots')),
                eppHearingProtection: this.cleanSelect(this.getValueField('eppHearingProtection')),
                eppOrganicVaporMask: this.cleanSelect(this.getValueField('eppOrganicVaporMask')),
                eppTyvekSuit: this.cleanSelect(this.getValueField('eppTyvekSuit')),
                eppSafetyGlasses: this.cleanSelect(this.getValueField('eppSafetyGlasses')),
                eppGloves: this.cleanSelect(this.getValueField('eppGloves')),
                eppRespiratoryProtection: this.cleanSelect(this.getValueField('eppRespiratoryProtection')),

                accessSystem: this.cleanSelect(this.getValueField('accessSystem')),
                accessSystemOther: this.cleanSelect(this.getValueField('accessSystemOther')),
                accessSystemStatus: this.cleanSelect(this.getValueField('accessSystemStatus')),

                aaj21Question1: this.cleanSelect(this.getValueField('aaj21Question1')),
                aaj21Question2: this.cleanSelect(this.getValueField('aaj21Question2')),
                aaj21Question3: this.cleanSelect(this.getValueField('aaj21Question3')),
                aaj21Question4: this.cleanSelect(this.getValueField('aaj21Question4')),
                aaj21Question5: this.cleanSelect(this.getValueField('aaj21Question5')),
                aaj21Question6: this.cleanSelect(this.getValueField('aaj21Question6')),
                aaj21Question7: this.cleanSelect(this.getValueField('aaj21Question7')),
                aaj21Question8: this.cleanSelect(this.getValueField('aaj21Question8')),
                wh22Question1: this.cleanSelect(this.getValueField('wh22Question1')),
                wh22Question2: this.cleanSelect(this.getValueField('wh22Question2')),
                wh22Question3: this.cleanSelect(this.getValueField('wh22Question3')),
                wh22Question4: this.cleanSelect(this.getValueField('wh22Question4')),
                wh22Question5: this.cleanSelect(this.getValueField('wh22Question5')),
                wh22Question6: this.cleanSelect(this.getValueField('wh22Question6')),
                wh22Question7: this.cleanSelect(this.getValueField('wh22Question7')),
                wh22Question8: this.cleanSelect(this.getValueField('wh22Question8')),
                wh22Question9: this.cleanSelect(this.getValueField('wh22Question9')),
                wh22Question10: this.cleanSelect(this.getValueField('wh22Question10')),
                wh22Question11: this.cleanSelect(this.getValueField('wh22Question11')),

                wet23Question1: this.cleanSelect(this.getValueField('wet23Question1')),
                wet23Question2: this.cleanSelect(this.getValueField('wet23Question2')),
                wet23Question3: this.cleanSelect(this.getValueField('wet23Question3')),
                wet23Question4: this.cleanSelect(this.getValueField('wet23Question4')),
                wet23Question5: this.cleanSelect(this.getValueField('wet23Question5')),

                lml24Question1: this.cleanSelect(this.getValueField('lml24Question1')),
                lml24Question2: this.cleanSelect(this.getValueField('lml24Question2')),
                lml24Question3: this.cleanSelect(this.getValueField('lml24Question3')),
                lml24Question4: this.cleanSelect(this.getValueField('lml24Question4')),
                lml24Question5: this.cleanSelect(this.getValueField('lml24Question5')),
                lml24Question6: this.cleanSelect(this.getValueField('lml24Question6')),
                lml24Question7: this.cleanSelect(this.getValueField('lml24Question7')),
                lml24Question8: this.cleanSelect(this.getValueField('lml24Question8')),
                lml24Question9: this.cleanSelect(this.getValueField('lml24Question9')),
                lml24Question10: this.cleanSelect(this.getValueField('lml24Question10')),

                hw25Question1: this.cleanSelect(this.getValueField('hw25Question1')),
                hw25Question2: this.cleanSelect(this.getValueField('hw25Question2')),
                hw25Question3: this.cleanSelect(this.getValueField('hw25Question3')),
                hw25Question4: this.cleanSelect(this.getValueField('hw25Question4')),
                hw25Question5: this.cleanSelect(this.getValueField('hw25Question5')),
                hw25Question6: this.cleanSelect(this.getValueField('hw25Question6')),
                hw25Question7: this.cleanSelect(this.getValueField('hw25Question7')),
                hw25Question8: this.cleanSelect(this.getValueField('hw25Question8')),
                hw25Question9: this.cleanSelect(this.getValueField('hw25Question9')),

                ew26Question1: this.cleanSelect(this.getValueField('ew26Question1')),
                ew26Question2: this.cleanSelect(this.getValueField('ew26Question2')),
                ew26Question3: this.cleanSelect(this.getValueField('ew26Question3')),

                we27Question1: this.cleanSelect(this.getValueField('we27Question1')),
                we27Question2: this.cleanSelect(this.getValueField('we27Question2')),
                we27Question3: this.cleanSelect(this.getValueField('we27Question3')),
                we27Question4: this.cleanSelect(this.getValueField('we27Question4')),
                we27Question5: this.cleanSelect(this.getValueField('we27Question5')),

                wcs28Question1: this.cleanSelect(this.getValueField('wcs28Question1')),
                wcs28Question2: this.cleanSelect(this.getValueField('wcs28Question2')),
                wcs28Question3: this.cleanSelect(this.getValueField('wcs28Question3')),
                wcs28Question4: this.cleanSelect(this.getValueField('wcs28Question4')),
                wcs28Question5: this.cleanSelect(this.getValueField('wcs28Question5')),
                wcs28Question6: this.cleanSelect(this.getValueField('wcs28Question6')),
                wcs28Question7: this.cleanSelect(this.getValueField('wcs28Question7')),

                coordinatorHeights: this.cleanSelect(this.getValueField('coordinatorHeights')),
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

import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'app/services/api.service';
import { ControllerFormsComponent } from '../controller-forms.Component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-sglc24',
  templateUrl: './sglc24.component.html',
  styleUrls: ['./sglc24.component.scss']
})
export class Sglc24Component  extends ControllerFormsComponent implements OnInit {

    override code = 'SG-LC-24';
    override id = this.activatedRouter.snapshot?.paramMap.get('id');
    image: string  = './assets/images/forms/sglc24.png';

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
                this._formBuilder.group({ name: 'location', value:   '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'operatorName', value:   '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'brand', value:   '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'serial', value:   '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'manufacturingModel', value:   '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'inspectionResult', value:   '', type: this.getTypeValue(1) }),
                this._formBuilder.group({ name: 'observations', value:   '', type: this.getTypeValue(1) }),

                this._formBuilder.group({ name: 'statusElectricalConnectionsMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskInstallationStatusMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'suitableCouplingsAccessoriesMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'handleInstallationStatusMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'fireWitchSafetyLockStatusMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'statusGuardGuideMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesRpmMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesTaskMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'generalConditionPolisherMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eppUsedAppropriatelyWorkMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateBarriersMonday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskStatusMonday', value:   '', type: this.getTypeValue(5) }),

                this._formBuilder.group({ name: 'statusElectricalConnectionsTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskInstallationStatusTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'suitableCouplingsAccessoriesTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'handleInstallationStatusTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'fireWitchSafetyLockStatusTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'statusGuardGuideTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesRpmTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesTaskTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'generalConditionPolisherTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eppUsedAppropriatelyWorkTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateBarriersTuesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskStatusTuesday', value:   '', type: this.getTypeValue(5) }),

                this._formBuilder.group({ name: 'statusElectricalConnectionsWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskInstallationStatusWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'suitableCouplingsAccessoriesWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'handleInstallationStatusWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'fireWitchSafetyLockStatusWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'statusGuardGuideWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesRpmWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesTaskWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'generalConditionPolisherWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eppUsedAppropriatelyWorkWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateBarriersWednesday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskStatusWednesday', value:   '', type: this.getTypeValue(5) }),

                this._formBuilder.group({ name: 'statusElectricalConnectionsThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskInstallationStatusThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'suitableCouplingsAccessoriesThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'handleInstallationStatusThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'fireWitchSafetyLockStatusThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'statusGuardGuideThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesRpmThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesTaskThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'generalConditionPolisherThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eppUsedAppropriatelyWorkThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateBarriersThursday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskStatusThursday', value:   '', type: this.getTypeValue(5) }),

                this._formBuilder.group({ name: 'statusElectricalConnectionsFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskInstallationStatusFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'suitableCouplingsAccessoriesFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'handleInstallationStatusFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'fireWitchSafetyLockStatusFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'statusGuardGuideFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesRpmFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesTaskFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'generalConditionPolisherFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eppUsedAppropriatelyWorkFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateBarriersFriday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskStatusFriday', value:   '', type: this.getTypeValue(5) }),

                this._formBuilder.group({ name: 'statusElectricalConnectionsSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskInstallationStatusSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'suitableCouplingsAccessoriesSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'handleInstallationStatusSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'fireWitchSafetyLockStatusSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'statusGuardGuideSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesRpmSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesTaskSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'generalConditionPolisherSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eppUsedAppropriatelyWorkSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateBarriersSaturday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskStatusSaturday', value:   '', type: this.getTypeValue(5) }),

                this._formBuilder.group({ name: 'statusElectricalConnectionsSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskInstallationStatusSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'suitableCouplingsAccessoriesSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'handleInstallationStatusSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'fireWitchSafetyLockStatusSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'statusGuardGuideSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesRpmSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateAccessoriesTaskSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'generalConditionPolisherSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'eppUsedAppropriatelyWorkSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'appropriateBarriersSunday', value:   '', type: this.getTypeValue(5) }),
                this._formBuilder.group({ name: 'diskStatusSunday', value:   '', type: this.getTypeValue(5) })
            ]),
            evidences: new FormControl([]),
            project: new FormControl(''),
            assistants: new FormControl([]),
            approval: new FormControl([]),
            fieldsItems: this._formBuilder.group({
                location: new FormControl(''),
                operatorName: new FormControl(''),
                brand: new FormControl(''),
                serial: new FormControl(''),
                manufacturingModel: new FormControl(''),
                inspectionResult: new FormControl(),
                observations: new FormControl(''),

                statusElectricalConnectionsMonday: new FormControl(),
                diskInstallationStatusMonday: new FormControl(),
                suitableCouplingsAccessoriesMonday: new FormControl(),
                handleInstallationStatusMonday: new FormControl(),
                fireWitchSafetyLockStatusMonday: new FormControl(),
                statusGuardGuideMonday: new FormControl(),
                appropriateAccessoriesRpmMonday: new FormControl(),
                appropriateAccessoriesTaskMonday: new FormControl(),
                generalConditionPolisherMonday: new FormControl(),
                eppUsedAppropriatelyWorkMonday: new FormControl(),
                appropriateBarriersMonday: new FormControl(),
                diskStatusMonday: new FormControl(),

                statusElectricalConnectionsTuesday: new FormControl(),
                diskInstallationStatusTuesday: new FormControl(),
                suitableCouplingsAccessoriesTuesday: new FormControl(),
                handleInstallationStatusTuesday: new FormControl(),
                fireWitchSafetyLockStatusTuesday: new FormControl(),
                statusGuardGuideTuesday: new FormControl(),
                appropriateAccessoriesRpmTuesday: new FormControl(),
                appropriateAccessoriesTaskTuesday: new FormControl(),
                generalConditionPolisherTuesday: new FormControl(),
                eppUsedAppropriatelyWorkTuesday: new FormControl(),
                appropriateBarriersTuesday: new FormControl(),
                diskStatusTuesday: new FormControl(),

                statusElectricalConnectionsWednesday: new FormControl(),
                diskInstallationStatusWednesday: new FormControl(),
                suitableCouplingsAccessoriesWednesday: new FormControl(),
                handleInstallationStatusWednesday: new FormControl(),
                fireWitchSafetyLockStatusWednesday: new FormControl(),
                statusGuardGuideWednesday: new FormControl(),
                appropriateAccessoriesRpmWednesday: new FormControl(),
                appropriateAccessoriesTaskWednesday: new FormControl(),
                generalConditionPolisherWednesday: new FormControl(),
                eppUsedAppropriatelyWorkWednesday: new FormControl(),
                appropriateBarriersWednesday: new FormControl(),
                diskStatusWednesday: new FormControl(),

                statusElectricalConnectionsThursday: new FormControl(),
                diskInstallationStatusThursday: new FormControl(),
                suitableCouplingsAccessoriesThursday: new FormControl(),
                handleInstallationStatusThursday: new FormControl(),
                fireWitchSafetyLockStatusThursday: new FormControl(),
                statusGuardGuideThursday: new FormControl(),
                appropriateAccessoriesRpmThursday: new FormControl(),
                appropriateAccessoriesTaskThursday: new FormControl(),
                generalConditionPolisherThursday: new FormControl(),
                eppUsedAppropriatelyWorkThursday: new FormControl(),
                appropriateBarriersThursday: new FormControl(),
                diskStatusThursday: new FormControl(),

                statusElectricalConnectionsFriday: new FormControl(),
                diskInstallationStatusFriday: new FormControl(),
                suitableCouplingsAccessoriesFriday: new FormControl(),
                handleInstallationStatusFriday: new FormControl(),
                fireWitchSafetyLockStatusFriday: new FormControl(),
                statusGuardGuideFriday: new FormControl(),
                appropriateAccessoriesRpmFriday: new FormControl(),
                appropriateAccessoriesTaskFriday: new FormControl(),
                generalConditionPolisherFriday: new FormControl(),
                eppUsedAppropriatelyWorkFriday: new FormControl(),
                appropriateBarriersFriday: new FormControl(),
                diskStatusFriday: new FormControl(),

                statusElectricalConnectionsSaturday: new FormControl(),
                diskInstallationStatusSaturday: new FormControl(),
                suitableCouplingsAccessoriesSaturday: new FormControl(),
                handleInstallationStatusSaturday: new FormControl(),
                fireWitchSafetyLockStatusSaturday: new FormControl(),
                statusGuardGuideSaturday: new FormControl(),
                appropriateAccessoriesRpmSaturday: new FormControl(),
                appropriateAccessoriesTaskSaturday: new FormControl(),
                generalConditionPolisherSaturday: new FormControl(),
                eppUsedAppropriatelyWorkSaturday: new FormControl(),
                appropriateBarriersSaturday: new FormControl(),
                diskStatusSaturday: new FormControl(),

                statusElectricalConnectionsSunday: new FormControl(),
                diskInstallationStatusSunday: new FormControl(),
                suitableCouplingsAccessoriesSunday: new FormControl(),
                handleInstallationStatusSunday: new FormControl(),
                fireWitchSafetyLockStatusSunday: new FormControl(),
                statusGuardGuideSunday: new FormControl(),
                appropriateAccessoriesRpmSunday: new FormControl(),
                appropriateAccessoriesTaskSunday: new FormControl(),
                generalConditionPolisherSunday: new FormControl(),
                eppUsedAppropriatelyWorkSunday: new FormControl(),
                appropriateBarriersSunday: new FormControl(),
                diskStatusSunday: new FormControl()
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
                operatorName: this.cleanSelect(this.getValueField('operatorName')),
                brand: this.cleanSelect(this.getValueField('brand')),
                serial: this.cleanSelect(this.getValueField('serial')),
                manufacturingModel: this.cleanSelect(this.getValueField('manufacturingModel')),
                inspectionResult: this.cleanSelect(this.getValueField('inspectionResult')),
                observations: this.cleanSelect(this.getValueField('observations')),

                statusElectricalConnectionsMonday: this.cleanSelect(this.getValueField('statusElectricalConnectionsMonday')),
                diskInstallationStatusMonday: this.cleanSelect(this.getValueField('diskInstallationStatusMonday')),
                suitableCouplingsAccessoriesMonday: this.cleanSelect(this.getValueField('suitableCouplingsAccessoriesMonday')),
                handleInstallationStatusMonday: this.cleanSelect(this.getValueField('handleInstallationStatusMonday')),
                fireWitchSafetyLockStatusMonday: this.cleanSelect(this.getValueField('fireWitchSafetyLockStatusMonday')),
                statusGuardGuideMonday: this.cleanSelect(this.getValueField('statusGuardGuideMonday')),
                appropriateAccessoriesRpmMonday: this.cleanSelect(this.getValueField('appropriateAccessoriesRpmvMonday')),
                appropriateAccessoriesTaskMonday: this.cleanSelect(this.getValueField('appropriateAccessoriesTaskMonday')),
                generalConditionPolisherMonday: this.cleanSelect(this.getValueField('generalConditionPolisherMonday')),
                eppUsedAppropriatelyWorkMonday: this.cleanSelect(this.getValueField('eppUsedAppropriatelyWorkMonday')),
                appropriateBarriersMonday: this.cleanSelect(this.getValueField('appropriateBarriersMonday')),
                diskStatusMonday: this.cleanSelect(this.getValueField('diskStatusMonday')),

                statusElectricalConnectionsTuesday: this.cleanSelect(this.getValueField('statusElectricalConnectionsTuesday')),
                diskInstallationStatusTuesday: this.cleanSelect(this.getValueField('diskInstallationStatusTuesday')),
                suitableCouplingsAccessoriesTuesday: this.cleanSelect(this.getValueField('suitableCouplingsAccessoriesTuesday')),
                handleInstallationStatusTuesday: this.cleanSelect(this.getValueField('handleInstallationStatusTuesday')),
                fireWitchSafetyLockStatusTuesday: this.cleanSelect(this.getValueField('fireWitchSafetyLockStatusTuesday')),
                statusGuardGuideTuesday: this.cleanSelect(this.getValueField('statusGuardGuideTuesday')),
                appropriateAccessoriesRpmTuesday: this.cleanSelect(this.getValueField('appropriateAccessoriesRpmvTuesday')),
                appropriateAccessoriesTaskTuesday: this.cleanSelect(this.getValueField('appropriateAccessoriesTaskTuesday')),
                generalConditionPolisherTuesday: this.cleanSelect(this.getValueField('generalConditionPolisherTuesday')),
                eppUsedAppropriatelyWorkTuesday: this.cleanSelect(this.getValueField('eppUsedAppropriatelyWorkTuesday')),
                appropriateBarriersTuesday: this.cleanSelect(this.getValueField('appropriateBarriersTuesday')),
                diskStatusTuesday: this.cleanSelect(this.getValueField('diskStatusTuesday')),

                statusElectricalConnectionsWednesday: this.cleanSelect(this.getValueField('statusElectricalConnectionsWednesday')),
                diskInstallationStatusWednesday: this.cleanSelect(this.getValueField('diskInstallationStatusWednesday')),
                suitableCouplingsAccessoriesWednesday: this.cleanSelect(this.getValueField('suitableCouplingsAccessoriesWednesday')),
                handleInstallationStatusWednesday: this.cleanSelect(this.getValueField('handleInstallationStatusWednesday')),
                fireWitchSafetyLockStatusWednesday: this.cleanSelect(this.getValueField('fireWitchSafetyLockStatusWednesday')),
                statusGuardGuideWednesday: this.cleanSelect(this.getValueField('statusGuardGuideWednesday')),
                appropriateAccessoriesRpmWednesday: this.cleanSelect(this.getValueField('appropriateAccessoriesRpmWednesday')),
                appropriateAccessoriesTaskWednesday: this.cleanSelect(this.getValueField('appropriateAccessoriesTaskWednesday')),
                generalConditionPolisherWednesday: this.cleanSelect(this.getValueField('generalConditionPolisherWednesday')),
                eppUsedAppropriatelyWorkWednesday: this.cleanSelect(this.getValueField('eppUsedAppropriatelyWorkWednesday')),
                appropriateBarriersWednesday: this.cleanSelect(this.getValueField('appropriateBarriersWednesday')),
                diskStatusWednesday: this.cleanSelect(this.getValueField('diskStatusWednesday')),

                statusElectricalConnectionsThursday: this.cleanSelect(this.getValueField('statusElectricalConnectionsThursday')),
                diskInstallationStatusThursday: this.cleanSelect(this.getValueField('diskInstallationStatusThursday')),
                suitableCouplingsAccessoriesThursday: this.cleanSelect(this.getValueField('suitableCouplingsAccessoriesThursday')),
                handleInstallationStatusThursday: this.cleanSelect(this.getValueField('handleInstallationStatusThursday')),
                fireWitchSafetyLockStatusThursday: this.cleanSelect(this.getValueField('fireWitchSafetyLockStatusThursday')),
                statusGuardGuideThursday: this.cleanSelect(this.getValueField('statusGuardGuideThursday')),
                appropriateAccessoriesRpmThursday: this.cleanSelect(this.getValueField('appropriateAccessoriesRpmvThursday')),
                appropriateAccessoriesTaskThursday: this.cleanSelect(this.getValueField('appropriateAccessoriesTaskThursday')),
                generalConditionPolisherThursday: this.cleanSelect(this.getValueField('generalConditionPolisherThursday')),
                eppUsedAppropriatelyWorkThursday: this.cleanSelect(this.getValueField('eppUsedAppropriatelyWorkThursday')),
                appropriateBarriersThursday: this.cleanSelect(this.getValueField('appropriateBarriersThursday')),
                diskStatusThursday: this.cleanSelect(this.getValueField('diskStatusThursday')),

                statusElectricalConnectionsFriday: this.cleanSelect(this.getValueField('statusElectricalConnectionsFriday')),
                diskInstallationStatusFriday: this.cleanSelect(this.getValueField('diskInstallationStatusFriday')),
                suitableCouplingsAccessoriesFriday: this.cleanSelect(this.getValueField('suitableCouplingsAccessoriesFriday')),
                handleInstallationStatusFriday: this.cleanSelect(this.getValueField('handleInstallationStatusFriday')),
                fireWitchSafetyLockStatusFriday: this.cleanSelect(this.getValueField('fireWitchSafetyLockStatusFriday')),
                statusGuardGuideFriday: this.cleanSelect(this.getValueField('statusGuardGuideFriday')),
                appropriateAccessoriesRpmFriday: this.cleanSelect(this.getValueField('appropriateAccessoriesRpmvFriday')),
                appropriateAccessoriesTaskFriday: this.cleanSelect(this.getValueField('appropriateAccessoriesTaskFriday')),
                generalConditionPolisherFriday: this.cleanSelect(this.getValueField('generalConditionPolisherFriday')),
                eppUsedAppropriatelyWorkFriday: this.cleanSelect(this.getValueField('eppUsedAppropriatelyWorkFriday')),
                appropriateBarriersFriday: this.cleanSelect(this.getValueField('appropriateBarriersFriday')),
                diskStatusFriday: this.cleanSelect(this.getValueField('diskStatusFriday')),

                statusElectricalConnectionsSaturday: this.cleanSelect(this.getValueField('statusElectricalConnectionsSaturday')),
                diskInstallationStatusSaturday: this.cleanSelect(this.getValueField('diskInstallationStatusSaturday')),
                suitableCouplingsAccessoriesSaturday: this.cleanSelect(this.getValueField('suitableCouplingsAccessoriesSaturday')),
                handleInstallationStatusSaturday: this.cleanSelect(this.getValueField('handleInstallationStatusSaturday')),
                fireWitchSafetyLockStatusSaturday: this.cleanSelect(this.getValueField('fireWitchSafetyLockStatusSaturday')),
                statusGuardGuideSaturday: this.cleanSelect(this.getValueField('statusGuardGuideSaturday')),
                appropriateAccessoriesRpmSaturday: this.cleanSelect(this.getValueField('appropriateAccessoriesRpmvSaturday')),
                appropriateAccessoriesTaskSaturday: this.cleanSelect(this.getValueField('appropriateAccessoriesTaskSaturday')),
                generalConditionPolisherSaturday: this.cleanSelect(this.getValueField('generalConditionPolisherSaturday')),
                eppUsedAppropriatelyWorkSaturday: this.cleanSelect(this.getValueField('eppUsedAppropriatelyWorkSaturday')),
                appropriateBarriersSaturday: this.cleanSelect(this.getValueField('appropriateBarriersSaturday')),
                diskStatusSaturday: this.cleanSelect(this.getValueField('diskStatusSaturday')),

                statusElectricalConnectionsSunday: this.cleanSelect(this.getValueField('statusElectricalConnectionsSunday')),
                diskInstallationStatusSunday: this.cleanSelect(this.getValueField('diskInstallationStatusSunday')),
                suitableCouplingsAccessoriesSunday: this.cleanSelect(this.getValueField('suitableCouplingsAccessoriesSunday')),
                handleInstallationStatusSunday: this.cleanSelect(this.getValueField('handleInstallationStatusSunday')),
                fireWitchSafetyLockStatusSunday: this.cleanSelect(this.getValueField('fireWitchSafetyLockStatusSunday')),
                statusGuardGuideSunday: this.cleanSelect(this.getValueField('statusGuardGuideSunday')),
                appropriateAccessoriesRpmSunday: this.cleanSelect(this.getValueField('appropriateAccessoriesRpmvSunday')),
                appropriateAccessoriesTaskSunday: this.cleanSelect(this.getValueField('appropriateAccessoriesTaskSunday')),
                generalConditionPolisherSunday: this.cleanSelect(this.getValueField('generalConditionPolisherSunday')),
                eppUsedAppropriatelyWorkSunday: this.cleanSelect(this.getValueField('eppUsedAppropriatelyWorkSunday')),
                appropriateBarriersSunday: this.cleanSelect(this.getValueField('appropriateBarriersSunday')),
                diskStatusSunday: this.cleanSelect(this.getValueField('diskStatusSunday'))
            });
        }
    }


    onSubmit(): void {
        this.validationSubmit();
    }
}

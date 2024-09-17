import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Functions } from 'app/components/functions/functions';
import { IdentificationTypes } from 'app/models/identification-types';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-list-items',
    template: '<p> </p>',
    styles: [
    ]
})
export abstract class ListItemsFormComponent  implements OnInit {

    function = new Functions();

    projectList: any = [];
    activityTypeList: any = [];
    placeList: any = [];
    numberPeopleInvitedList: any = [];
    improvementActionActionList: any = [];
    efficacyEvaluationList: any = [];
    evaluationMethodList: any = [];
    startTimeList: any = [];
    numberPeopleAttendingList: any = [];
    employeesList: any = [];
    toolsInspectionStatus: any = [];
    state: any = [];
    state2: any = [];
    stateVerification: any = [];
    typeStairs: any = [];
    typeWork: any = [];
    paramsForms: any = [];
    paramLabels: any = [];
    accessSystem: any = [];
    state3: any = [];
    elementsHealthcareProvider: any = [];
    elementsOccupationRiskManager: any = [];

    constructor(protected api: ApiService) {
    }

    ngOnInit(): void {

    }

    async getProject(): Promise<void> {
        await  this.api.projectService(1).subscribe({
            next: (items: any) => {
                this.projectList = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    async getEmployees(): Promise<void> {
        await  this.api.employeesService().subscribe({
            next: (response: any) => {
                response.data.forEach((item: any) => {
                    this.employeesList.push({ code: item.id,
                        name: item.fullName });
                });
            }, error: (e: any) => console.error(e)
        });
    }

    async getActivityType(): Promise<void> {
        await  this.api.dataFieldService('activityType').subscribe({
            next: (response: any) => {
                this.activityTypeList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getPlace(): Promise<void> {
        await  this.api.dataFieldService('place').subscribe({
            next: (response: any) => {
                this.placeList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getNumberPeopleInvited(): Promise<void> {
        await  this.api.dataFieldService('numberPeopleInvited').subscribe({
            next: (response: any) => {
                this.numberPeopleInvitedList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getImprovementAction(): Promise<void> {
        await  this.api.dataFieldService('improvementAction').subscribe({
            next: (response: any) => {
                this.improvementActionActionList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getEfficacyEvaluation(): Promise<void> {
        await  this.api.dataFieldService('efficacyEvaluation').subscribe({
            next: (response: any) => {
                this.efficacyEvaluationList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }


    async getEvaluationMethod(): Promise<void> {
        await  this.api.dataFieldService('evaluationMethod').subscribe({
            next: (response: any) => {
                this.evaluationMethodList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getStartTime(): Promise<void> {
        await  this.api.dataFieldService('startTime').subscribe({
            next: (response: any) => {
                this.startTimeList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getNumberPeopleAttending(): Promise<void> {
        await  this.api.dataFieldService('numberPeopleAttending').subscribe({
            next: (response: any) => {
                this.numberPeopleAttendingList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getToolsInspectionStatus(): Promise<void> {
        await  this.api.dataFieldService('toolsInspectionStatus').subscribe({
            next: (response: any) => {
                this.toolsInspectionStatus = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getState(): Promise<void> {
        await  this.api.dataFieldService('state').subscribe({
            next: (response: any) => {
                this.state = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getState2(): Promise<void> {
        await  this.api.dataFieldService('state2').subscribe({
            next: (response: any) => {
                this.state2 = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getStateVerification(): Promise<void> {
        await  this.api.dataFieldService('stateVerification').subscribe({
            next: (response: any) => {
                this.stateVerification = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getTypeStairs(): Promise<void> {
        await  this.api.dataFieldService('typeStairs').subscribe({
            next: (response: any) => {
                this.typeStairs = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getTypeWork(): Promise<void> {
        await  this.api.dataFieldService('typeWork').subscribe({
            next: (response: any) => {
                this.typeWork = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getLabels(): Promise<void> {
        await  this.api.dataFieldService('labels').subscribe({
            next: (response: any) => {
                this.paramLabels = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getParam(item: any): Promise<void> {
        await  this.api.dataFieldService(item).subscribe({
            next: (response: any) => {
                this.paramsForms = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getAccessSystem(): Promise<void> {
        await  this.api.dataFieldService('accessSystem').subscribe({
            next: (response: any) => {
                this.accessSystem = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getState3(): Promise<void> {
        await  this.api.dataFieldService('state3').subscribe({
            next: (response: any) => {
                this.state3 = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getHealthcareProvider(): void {
        this.api.healthcareProviderService().subscribe({
            next: (items: any) => {
                this.elementsHealthcareProvider = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getOccupationRiskManager(): void {
        this.api.occupationRiskManagerService().subscribe({
            next: (items: any) => {
                this.elementsOccupationRiskManager = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    formatSelectData(elements: any): Promise<void> {
        let index: number;
        const elementsData: any = [];
        for (index = 0; index < elements.data.length; index++) {
            elementsData.push({
                code: elements.data[index].id,
                name: elements.data[index].name
            });
        }
        return elementsData;
    }
}

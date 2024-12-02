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
    elementsCompanies: any = [];
    elementsHealthcareProvider: any = [];
    elementsOccupationRiskManager: any = [];

    constructor(protected api: ApiService) {
    }

    ngOnInit(): void {

    }

    async getProject(): Promise<void> {
        await  this.api.projectService().subscribe({
            next: (items: any) => {
                this.projectList = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    async getEmployees(): Promise<void> {
        await  this.api.employeesService().subscribe({
            next: (response: any) => {
                response.forEach((item: any) => {
                    this.employeesList.push({ code: item.id,
                        name: item.fullName });
                });
            }, error: (e: any) => console.error(e)
        });
    }

    async getActivityType(): Promise<void> {
        await  this.api.dataFieldIdService('activityType').subscribe({
            next: (response: any) => {
                this.activityTypeList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getPlace(): Promise<void> {
        await  this.api.dataFieldIdService('place').subscribe({
            next: (response: any) => {
                this.placeList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getNumberPeopleInvited(): Promise<void> {
        await  this.api.dataFieldIdService('numberPeopleInvited').subscribe({
            next: (response: any) => {
                this.numberPeopleInvitedList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getImprovementAction(): Promise<void> {
        await  this.api.dataFieldIdService('improvementAction').subscribe({
            next: (response: any) => {
                this.improvementActionActionList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getEfficacyEvaluation(): Promise<void> {
        await  this.api.dataFieldIdService('efficacyEvaluation').subscribe({
            next: (response: any) => {
                this.efficacyEvaluationList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }


    async getEvaluationMethod(): Promise<void> {
        await  this.api.dataFieldIdService('evaluationMethod').subscribe({
            next: (response: any) => {
                this.evaluationMethodList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getStartTime(): Promise<void> {
        await  this.api.dataFieldIdService('startTime').subscribe({
            next: (response: any) => {
                this.startTimeList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getNumberPeopleAttending(): Promise<void> {
        await  this.api.dataFieldIdService('numberPeopleAttending').subscribe({
            next: (response: any) => {
                this.numberPeopleAttendingList = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getToolsInspectionStatus(): Promise<void> {
        await  this.api.dataFieldIdService('toolsInspectionStatus').subscribe({
            next: (response: any) => {
                this.toolsInspectionStatus = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getState(): Promise<void> {
        await  this.api.dataFieldIdService('state').subscribe({
            next: (response: any) => {
                this.state = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getState2(): Promise<void> {
        await  this.api.dataFieldIdService('state2').subscribe({
            next: (response: any) => {
                this.state2 = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getStateVerification(): Promise<void> {
        await  this.api.dataFieldIdService('stateVerification').subscribe({
            next: (response: any) => {
                this.stateVerification = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getTypeStairs(): Promise<void> {
        await  this.api.dataFieldIdService('typeStairs').subscribe({
            next: (response: any) => {
                this.typeStairs = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getTypeWork(): Promise<void> {
        await  this.api.dataFieldIdService('typeWork').subscribe({
            next: (response: any) => {
                this.typeWork = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getLabels(): Promise<void> {
        await  this.api.dataFieldIdService('labels').subscribe({
            next: (response: any) => {
                this.paramLabels = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getParam(item: any): Promise<void> {
        await  this.api.dataFieldIdService(item).subscribe({
            next: (response: any) => {
                this.paramsForms = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getAccessSystem(): Promise<void> {
        await  this.api.dataFieldIdService('accessSystem').subscribe({
            next: (response: any) => {
                this.accessSystem = response?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    async getState3(): Promise<void> {
        await  this.api.dataFieldIdService('state3').subscribe({
            next: (response: any) => {
                this.state3 = response?.values;
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
        for (index = 0; index < elements.length; index++) {
            elementsData.push({
                code: elements[index].uid,
                name: elements[index].name
            });
        }
        return elementsData;
    }

    getCompanies(): void {
        this.api.companyService().subscribe({
            next: (data: any) => {
                let index: number;
                for (index = 0; index < data.length; index++) {
                    this.elementsCompanies.push({
                        code: data[index].uid,
                        name: data[index].name

                    });
                }
            }, error: (e: any) => console.error(e)
        });
    }
}

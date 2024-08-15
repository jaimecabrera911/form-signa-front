import {Component, OnInit} from '@angular/core';
import {Functions} from 'app/components/functions/functions';
import {ApiService} from 'app/services/api.service';

@Component({
    selector: 'app-list-items',
    template: '<p> </p>',
    styles: []
})
export abstract class ListItemsFormComponent implements OnInit {

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
    stateVerification: any = [];
    typeStairs: any = [];

    constructor(protected api: ApiService) {
    }

    ngOnInit(): void {

    }

    getProject(): void {
        this.api.projectService(1).subscribe({
            next: (items: any) => {
                this.projectList = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getEmployees(): void {
        this.api.employeesService().subscribe({
            next: (response: any) => {
                response.data.forEach((item: any) => {
                    this.employeesList.push({
                        code: item.id,
                        name: this.function.setNameEmployee(item.firstName, item.secondName, item.firstSurname, item.secondSurname)
                    });
                });
            }, error: (e: any) => console.error(e)
        });
    }

    getActivityType(): void {
        this.api.dataFieldService('activityType').subscribe({
            next: (response: any) => {
                this.activityTypeList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getPlace(): void {
        this.api.dataFieldService('place').subscribe({
            next: (response: any) => {
                this.placeList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getNumberPeopleInvited(): void {
        this.api.dataFieldService('numberPeopleInvited').subscribe({
            next: (response: any) => {
                this.numberPeopleInvitedList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getImprovementAction(): void {
        this.api.dataFieldService('improvementAction').subscribe({
            next: (response: any) => {
                this.improvementActionActionList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getEfficacyEvaluation(): void {
        this.api.dataFieldService('efficacyEvaluation').subscribe({
            next: (response: any) => {
                this.efficacyEvaluationList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }


    getEvaluationMethod(): void {
        this.api.dataFieldService('evaluationMethod').subscribe({
            next: (response: any) => {
                this.evaluationMethodList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getStartTime(): void {
        this.api.dataFieldService('startTime').subscribe({
            next: (response: any) => {
                this.startTimeList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getNumberPeopleAttending(): void {
        this.api.dataFieldService('numberPeopleAttending').subscribe({
            next: (response: any) => {
                this.numberPeopleAttendingList = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getToolsInspectionStatus(): void {
        this.api.dataFieldService('toolsInspectionStatus').subscribe({
            next: (response: any) => {
                this.toolsInspectionStatus = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getState(): void {
        this.api.dataFieldService('state').subscribe({
            next: (response: any) => {
                this.state = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getStateVerification(): void {
        this.api.dataFieldService('stateVerification').subscribe({
            next: (response: any) => {
                this.stateVerification = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }

    getTypeStairs(): void {
        this.api.dataFieldService('typeStairs').subscribe({
            next: (response: any) => {
                this.typeStairs = response?.data[0]?.values;
            }, error: (e: any) => console.error(e)
        });
    }


    formatSelectData(elements: any): void {
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

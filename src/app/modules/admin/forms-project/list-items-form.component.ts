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
                    this.employeesList.push({ code: item.id,
                        name: this.function.setNameEmployee(item.firstName, item.secondName, item.firstSurname, item.secondSurname)});
                });
            }, error: (e: any) => console.error(e)
        });
    }

    getActivityType(): void {
        this.api.dataFieldService('activityType').subscribe({
            next: (response: any) => {
                this.activityTypeList = response.data[0].values;
            }, error: (e: any) => console.error(e)
        });
    }

    getPlace(): void {
        this.api.dataFieldService('place').subscribe({
            next: (response: any) => {
                this.placeList = response.data[0].values;
            }, error: (e: any) => console.error(e)
        });
    }

    getNumberPeopleInvited(): void {
        this.api.dataFieldService('numberPeopleInvited').subscribe({
            next: (response: any) => {
                this.numberPeopleInvitedList = response.data[0].values;
            }, error: (e: any) => console.error(e)
        });
    }

    getImprovementAction(): void {
        this.api.dataFieldService('improvementAction').subscribe({
            next: (response: any) => {
                this.improvementActionActionList = response.data[0].values;
            }, error: (e: any) => console.error(e)
        });
    }

    getEfficacyEvaluation(): void {
        this.api.dataFieldService('efficacyEvaluation').subscribe({
            next: (response: any) => {
                this.efficacyEvaluationList = response.data[0].values;
            }, error: (e: any) => console.error(e)
        });
    }


    getEvaluationMethod(): void {
        this.api.dataFieldService('evaluationMethod').subscribe({
            next: (response: any) => {
                this.evaluationMethodList = response.data[0].values;
            }, error: (e: any) => console.error(e)
        });
    }

    getStartTime(): void {
        this.api.dataFieldService('startTime').subscribe({
            next: (response: any) => {
                this.startTimeList = response.data[0].values;
            }, error: (e: any) => console.error(e)
        });
    }

    getNumberPeopleAttending(): void {
        this.api.dataFieldService('numberPeopleAttending').subscribe({
            next: (response: any) => {
                this.numberPeopleAttendingList = response.data[0].values;
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

    /*
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
    */


    /*
    getPosition(): void {
        this.api.positionService().subscribe({
            next: (items: any) => {
                this.elementsPosition = this.formatSelectData(items);
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

    getPension(): void {
        this.api.pensionService().subscribe({
            next: (items: any) => {
                this.elementsPension = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getCompensationFund(): void {
        this.api.compensationFundService().subscribe({
            next: (items: any) => {
                this.elementsCompensationFund = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }


    getIdentificationTypes(): void {
        this.api.identificationTypesService().subscribe({
            next: (data: any) => {
                let i: number;
                for (i = 0; i < data.data.length; i++) {
                    this.elementsIdentificationTypes.push({
                        code: data.data[i].id,
                        name: data.data[i].type
                    });
                }
            },error: (e: any) => console.error(e)
        });
    }

    getCountries(): void {
        this.api.countriesService().subscribe({
            next: (items: any) => {
                this.elementsCountries = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getCities(): void {
        this.api.citiesService().subscribe({
            next: (items: any) => {
                this.elementsCities = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getRegimes(): void {
        this.api.regimesService().subscribe({
            next: (items: any) => {
                this.elementsRegimes = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getGenders(): void {
        this.api.gendersService().subscribe({
            next: (items: any) => {
                this.elementsGenders = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getDepartments(): void {
        this.api.departmentService().subscribe({
            next: (items: any) => {
                this.elementsDepartaments = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }


    getStateProject(): void {
        this.api.stateProjectService().subscribe({
            next: (items: any) => {
                this.elementsStateProject = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

*/

}

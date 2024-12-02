import { Data } from './../../../models/data';
import { countries } from './../../../mock-api/apps/contacts/data';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { City } from 'app/models/city';
import { Company } from 'app/models/company';
import { Country } from 'app/models/country';
import { Department } from 'app/models/department';
import { IdentificationTypes } from 'app/models/identification-types';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';
import { ListComponent } from 'app/components/list/list-component';

@Component({
    selector: 'app-list-items',
    template: '<p> </p>',
    styles: []
})
export abstract class ListItemsComponent extends ListComponent implements OnInit {

    identificationTypes: Observable<IdentificationTypes>;
    elementsIdentificationTypes: any = [];
    companies: Observable<Company>;
    elementsCompanies: any = [];
    cities: Observable<City>;
    elementsCities: any = [];
    countries: Observable<Country>;
    elementsCountries: any = [];
    departaments: Observable<Department>;
    elementsDepartaments: any = [];
    data: Observable<Data>;
    elementsHealthcareProvider: any = [];
    elementsOccupationRiskManager: any = [];
    elementsCompensationFund: any = [];
    elementsPension: any = [];
    elementsRegimes: any = [];
    elementsGenders: any = [];
    elementsWorkspace: any = [];
    elementsPosition: any = [];
    elementsStateProject: any = [];
    elementsEmployees: any = [];
    paramLabels: any = [];

    constructor(protected api: ApiService) {
        super(api);
    }

    ngOnInit(): void {
        super.ngOnInit();
        this.initForm();
    }

    formatSelectData(elements: any): void {
        let index: number;
        const elementsData: any = [];
        for (index = 0; index < elements.length; index++) {
            elementsData.push({
                code: elements[index].code,
                name: elements[index].name
            });
        }
        return elementsData;
    }

    formatSelectDataSocialEntity(elements: any): void {
        let index: number;
        const elementsData: any = [];
        for (index = 0; index < elements.length; index++) {
            elementsData.push({
                code: elements[index].name,
                name: elements[index].name
            });
        }
        return elementsData;
    }


    getEmployees(): void {
        this.api.employeesService().subscribe({
            next: (items: any) => {
                let i: number;
                for (i = 0; i < items.length; i++) {
                    this.elementsEmployees.push({
                        code: items[i].email,
                        name: `${items[i].fullName}`
                    });
                }
            }, error: (e: any) => console.error(e)
        });
    }

    getWorkspace(): void {
        this.api.workspaceService().subscribe({
            next: (items: any) => {
                this.elementsWorkspace = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getPosition(): void {
        this.api.positionService().subscribe({
            next: (items: any) => {
                this.elementsPosition = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }


    getHealthcareProvider(): void {
        this.api.socialEntities('EPS').subscribe({
            next: (items: any) => {
                this.elementsHealthcareProvider = this.formatSelectDataSocialEntity(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getOccupationRiskManager(): void {
        this.api.socialEntities('ARL').subscribe({
            next: (items: any) => {
                this.elementsOccupationRiskManager = this.formatSelectDataSocialEntity(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getPension(): void {
        this.api.socialEntities('PENSION').subscribe({
            next: (items: any) => {
                this.elementsPension = this.formatSelectDataSocialEntity(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getCompensationFund(): void {
        this.api.socialEntities('CCF').subscribe({
            next: (items: any) => {
                this.elementsCompensationFund = this.formatSelectDataSocialEntity(items);
            }, error: (e: any) => console.error(e)
        });
    }


    getIdentificationTypes(): void {
        this.api.identificationTypesService().subscribe({
            next: (data: any) => {
                let i: number;
                for (i = 0; i < data.length; i++) {
                    this.elementsIdentificationTypes.push({
                        code: data[i].code,
                        name: data[i].name
                    });
                }
            }, error: (e: any) => console.error(e)
        });
    }

    getCountries(): void {
        this.api.countriesService().subscribe({
            next: (items: any) => {
                this.elementsCountries = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getCities(codeDepartment: any): void {
        this.api.citiesService(codeDepartment).subscribe({
            next: (items: any) => {
                this.elementsCities = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }

    getRegimes(): void {
        this.api.regimesService().subscribe({
            next: (items: any) => {
                this.elementsRegimes = this.formatSelectData(items);
                console.log('elementsRegimes :: ',this.elementsRegimes);
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

    getDepartments(codeCountry: any): void {
        this.api.departmentService(codeCountry).subscribe({
            next: (items: any) => {
                this.elementsDepartaments = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });
    }


    async getStateProject(): Promise<void> {
        await this.api.dataFieldIdService('statusProject').subscribe({
            next: (response: any) => {
                console.log('response 1 :: ',response);
                this.elementsStateProject = response?.values;
            }, error: (e: any) => console.error(e)
        });

        /*this.api.stateProjectService().subscribe({
            next: (items: any) => {
                this.elementsStateProject = this.formatSelectData(items);
            }, error: (e: any) => console.error(e)
        });*/
    }

    async getLabels(): Promise<void> {
        await this.api.dataFieldIdService('labels').subscribe({
            next: (response: any) => {
                this.paramLabels = response?.values;
            }, error: (e: any) => console.error(e)
        });
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

    abstract initForm(): void;

}

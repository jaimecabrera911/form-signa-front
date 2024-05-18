import { Data } from './../models/data';
import { IdentificationTypes } from 'app/models/identification-types';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'app/models/subscription';
import { Observable } from 'rxjs';

import { City } from 'app/models/city';
import { Country } from 'app/models/country';
import { State } from 'app/models/state';
import { Project } from 'app/models/project';
import { Employee } from 'app/models/employee';
import { Company } from 'app/models/company';
import { Department } from 'app/models/department';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    constructor(private http: HttpClient) { }

    /*----------------  Tables  ----------------*/

    getParams(
        params: Map<string, string>,
        page: number,
        size: number,
        sortBy: string,
        direction: string
    ): HttpParams {
        let httpParams = new HttpParams()
            .set('page', page)
            .set('size', size)
            .set('sort', sortBy)
            .set('direction', direction);
        // tslint:disable-next-line:only-arrow-functions
        // eslint-disable-next-line prefer-arrow/prefer-arrow-functions
        params.forEach(function(value, key) {
            httpParams = httpParams.set(key, value);
        });
        console.log(httpParams);
        return httpParams;
    }



    /*-------------------------|
        projects               |
     -------------------------*/

    projectService(): Observable<Project> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects?populate=city%2Cuser%2Cstate`;
        return this.http.get<any>(url,{headers});
    }

    projectIdService(id: number): Observable<Project> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'city%2Ccompany%2Cuser%2Cstate&filters%5Bid%5D';
        const url = `${environment.apiUrl}projects?populate=${filetrs}=${id}`;
        return this.http.get<Project>(url,{headers});
    }

    createProjectService(data): Observable<Project> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects`;
        return this.http.post<Project>(url, data, {headers});
    }

    updateProjectService(data,id): Observable<Project> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects/${id}`;
        return this.http.put<Project>(url, data, {headers});
    }


    /*-------------------------|
        Employees              |
     -------------------------*/

    employeesService(): Observable<Employee> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=position`;
        return this.http.get<Employee>(url,{headers});
    }

    employeIdService(id: number): Observable<Employee> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'identificationType%2Cposition%2Ccompany%2ChealthcareProvider%2Cpension%2CoccupationRiskManager%2CcompensationFund%2Cworkspace%2Cgender%2Ccity';
        const filters2 = '%2CbirthCountry%2Cuser%2CprofilePicture%2Csignature%2Cfiles&filters%5Bid%5D';
        const url = `${environment.apiUrl}employees?populate=${filetrs}${filters2}=${id}`;
        return this.http.get<Employee>(url,{headers});
    }

    createEmployeeService(data): Observable<Employee> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees`;
        return this.http.post<Employee>(url, data, {headers});
    }

    updateEmployeeService(data,id): Observable<Employee> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees/${id}`;
        return this.http.put<Employee>(url, data, {headers});
    }

    /*-------------------------|
       Company                 |
    -------------------------*/

    companyService(): Observable<Company> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies`;
        return this.http.get<Company>(url,{headers});
    }

    companyIdService(id: number): Observable<Company> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'regime%2Ccity%2Cprojacts%2Cemployees%2Cpositions%2Cworkspaces&filters%5Bid%5D';
        const url = `${environment.apiUrl}companies?populate=${filetrs}=${id}`;
        return this.http.get<Company>(url,{headers});
    }

    createCompanyService(data): Observable<Company> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies`;
        return this.http.post<Company>(url, data, {headers});
    }

    updateCompanyService(data,id): Observable<Company> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies/${id}`;
        return this.http.put<Company>(url, data, {headers});
    }

    /*-------------------------|
       Forms                   |
    -------------------------*/

    formsService(id): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'fields%2Cevidences%2Cproject%20&filters%5Bproject%5D[id]';
        const url = `${environment.apiUrl}forms?populate=${filetrs}=${id}`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
       Templates Forms          |
    -------------------------*/

    temapltesFormService(id): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'fields%2Cevidences%2Cproject%20&filters%5Bproject%5D[id]';
        const url = `${environment.apiUrl}forms?populate=${filetrs}=${id}`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        Cities                 |
    -------------------------*/

    citiesService(): Observable<City> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}cities`;
        return this.http.get<City>(url,{headers});
    }

    /*-------------------------|
        Department             |
    -------------------------*/

    departmentService(): Observable<Department> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}departments`;
        return this.http.get<Department>(url,{headers});
    }

    /*-------------------------|
        Countries              |
    -------------------------*/

    countriesService(): Observable<Country> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}countries`;
        return this.http.get<Country>(url,{headers});
    }

    /*-------------------------|
      Tipo Identificación      |
    --------------------------*/

    identificationTypesService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}identification-types`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        Regimen                |
    --------------------------*/

    regimesService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}regimes`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        Pensión                |
    --------------------------*/

    pensionService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}pensions`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        HealthcareProvider     |
    --------------------------*/

    healthcareProviderService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}healthcare-providers`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        OccupationRiskManager   |
    --------------------------*/

    occupationRiskManagerService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}occupation-risk-managers`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        compensationFundService |
    --------------------------*/

    compensationFundService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}compensation-funds`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        Workspace               |
    --------------------------*/

    workspaceService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}workspaces`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        Position                |
    --------------------------*/

    positionService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}positions`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        Genders                 |
    --------------------------*/

    gendersService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}genders`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        state Project           |
    --------------------------*/

    stateProjectService(): Observable<any> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}state-projects`;
        return this.http.get<any>(url,{headers});
    }



    /*-------------------------|
        Data                   |
    -------------------------*/

    documentsUserService(): Observable<any> {
        //const url = `..`;
        return this.http.get<any>('/../assets/json/data.json');
    }

    /*-------------------------|
        Upload                 |
    -------------------------*/

    uploadService(data): Observable<Company> {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}upload`;
        return this.http.post<Company>(url, data, {headers});
    }




















    /*-------------------------|
       subscriptions          |
    -------------------------*/

    subscriptionService(): Observable<Subscription> {
        const url = `${environment.apiUrl}subscriptions`;
        return this.http.get<any>(url);
    }

    saveSubscriptionService(data): Observable<Subscription> {
        const url = `${environment.apiUrl}subscriptions`;
        return this.http.post<Subscription>(url, data);
    }



    /*-------------------------|
        Cities                 |
    -------------------------*/
    /*
        citiesService(): Observable<City>{
            const url = `${environment.apiUrl}cities`;
            return this.http.get<City>(url);
        }

        saveCitiesService(data): Observable<City> {
            const url = `${environment.apiUrl}cities`;
            return this.http.post<City>(url, data);
        }
    */
    /*-------------------------|
        Countries              |
    -------------------------*/
    /*
        countriesService(): Observable<Country>{
            const url = `${environment.apiUrl}countries`;
            return this.http.get<Country>(url);
        }

        saveCountriesService(data): Observable<Country> {
            const url = `${environment.apiUrl}countries`;
            return this.http.post<Country>(url, data);
        }
    */
    /*-------------------------|
        States                 |
    -------------------------*/

    statesService(): Observable<State> {
        const url = `${environment.apiUrl}states`;
        return this.http.get<State>(url);
    }

    saveStatesService(data): Observable<State> {
        const url = `${environment.apiUrl}states`;
        return this.http.post<State>(url, data);
    }



}

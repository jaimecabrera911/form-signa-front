import { Data } from './../models/data';
import { IdentificationTypes } from 'app/models/identification-types';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
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
        const url = `${environment.apiUrl}projects`;
        return this.http.get<any>(url);
    }


    /*-------------------------|
        Employees              |
     -------------------------*/

    employeesService(): Observable<Employee> {
        const url = `${environment.apiUrl}users`;
        return this.http.get<Employee>(url);
    }

    createEmployeeService(data): Observable<Employee> {
        const url = `${environment.apiUrl}users`;
        return this.http.post<Employee>(url, data);
    }

    /*-------------------------|
       Company                 |
    -------------------------*/

    companyService(): Observable<Company> {
        const url = `${environment.apiUrl}companies`;
        return this.http.get<Company>(url);
    }

    createCompanyService(data): Observable<Company> {
        const url = `${environment.apiUrl}companies`;
        return this.http.post<Company>(url, data);
    }

    /*-------------------------|
        Cities                 |
    -------------------------*/

    citiesService(): Observable<City> {
        const url = `${environment.apiUrl}locations/cities`;
        return this.http.get<City>(url);
    }

    /*-------------------------|
        Department             |
    -------------------------*/

    departmentService(): Observable<Department> {
        const url = `${environment.apiUrl}locations/departments`;
        return this.http.get<Department>(url);
    }

    /*-------------------------|
        Countries              |
    -------------------------*/

    countriesService(): Observable<Country> {
        const url = `${environment.apiUrl}locations/countries`;
        return this.http.get<Country>(url);
    }

    /*-------------------------|
      Tipo Identificación      |
    --------------------------*/

    identificationTypesService(): Observable<any> {
        const url = `${environment.apiUrl}identifications/types`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        Data                   |
    -------------------------*/

    dataService(type: string): Observable<any> {
        const url = `${environment.apiUrl}data/type/${type}`;
        return this.http.get<any>(url);
    }


    /*-------------------------|
        Data                   |
    -------------------------*/

    documentsUserService(): Observable<Document> {
        //const url = `..`;
        return this.http.get<Document>('/../assets/json/data.json');
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

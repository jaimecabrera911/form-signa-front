/* eslint-disable @typescript-eslint/naming-convention */
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { City } from 'app/models/city';
import { Country } from 'app/models/country';
import { State } from 'app/models/state';
import { Project } from 'app/models/project';
import { Employee } from 'app/models/employee';
import { Company } from 'app/models/company';
import { Department } from 'app/models/department';
import { Users } from 'app/models/users';
import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Assistants } from 'app/models/assitant';
import { Form } from 'app/models/form';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    company: any = 1;

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
        return httpParams;
    }



    /*-------------------------|
        projects               |
     -------------------------*/

    projectService(id: number): Observable<Project> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects?populate=%2A&filters%5Bcompany%5D[id]=${id}`;
        return this.http.get<any>(url,{headers});
    }

    projectIdService(id: number): Observable<Project> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'city%2Ccompany%2Cuser%2Cstate&filters%5Bid%5D';
        const url = `${environment.apiUrl}projects?populate=${filetrs}=${id}`;
        return this.http.get<Project>(url,{headers});
    }

    createProjectService(data): Observable<Project> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects`;
        return this.http.post<Project>(url, data, {headers});
    }

    updateProjectService(data,id): Observable<Project> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects/${id}`;
        return this.http.put<Project>(url, data, {headers});
    }

    /*-------------------------|
        Users                  |
    --------------------------*/

    createUserService(data: any): Observable<Users> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}users`;
        return this.http.post<Users>(url, data, {headers});
    }

    userIdService(id: number): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}users=${id}`;
        return this.http.get<any>(url,{headers});
    }

    updateUsersService(data,id): Observable<Users> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects/${id}`;
        return this.http.put<Users>(url, data, {headers});
    }


    /*-------------------------|
        Employees              |
    --------------------------*/

    employeesService(): Observable<Employee> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url,{headers});
    }

    employeesActiveService(): Observable<Employee> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5Benabled%5D=true&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url,{headers});
    }

    employeesManagerService(): Observable<Employee> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5BisManager%5D=true&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url,{headers});
    }

    employeIdService(id: number): Observable<Employee> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5Bid%5D=${id}&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url,{headers});
    }

    createEmployeeService(data): Observable<Employee> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees`;
        return this.http.post<Employee>(url, data, {headers});
    }

    updateEmployeeService(data,id): Observable<Employee> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees/${id}`;
        return this.http.put<Employee>(url, data, {headers});
    }

    /*-------------------------|
       Company                 |
    -------------------------*/

    companyService(): Observable<Company> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies`;
        return this.http.get<Company>(url,{headers});
    }

    companyIdService(id: number): Observable<Company> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'regime%2Ccity%2Cprojacts%2Cemployees%2Cpositions%2Cworkspaces&filters%5Bid%5D';
        const url = `${environment.apiUrl}companies?populate=${filetrs}=${id}`;
        return this.http.get<Company>(url,{headers});
    }

    createCompanyService(data): Observable<Company> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies`;
        return this.http.post<Company>(url, data, {headers});
    }

    updateCompanyService(data,id): Observable<Company> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies/${id}`;
        return this.http.put<Company>(url, data, {headers});
    }

    /*-------------------------|
       Forms                   |
    -------------------------*/

    formsService(): Observable<Form> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms?populate=%2A&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<any>(url,{headers});
    }

    formIdService(id): Observable<Form> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms?populate=%2A&filters%5Bid%5D=${id}`;
        return this.http.get<Form>(url,{headers});
    }

    createFormSevice(data): Observable<Form> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms`;
        return this.http.post<Form>(url, data, {headers});
    }

    updateFormService(data,id): Observable<Form> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms/${id}`;
        return this.http.put<Form>(url, data, {headers});
    }

     /*-------------------------|
       Templates Forms          |
    -------------------------*/

    templatesFormService(id: number): Observable<Template> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'company%2Cimage&filters%5Bcompany%5D[id]';
        const url = `${environment.apiUrl}form-templates?populate=${filetrs}=${id}`;
        return this.http.get<Template>(url,{headers});
    }

    templatesIdService(code: string): Observable<Template> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}form-templates?filters%5Bcode%5D=${code}`;
        return this.http.get<Template>(url,{headers});
    }

    /*-------------------------|
        Assistants             |
    -------------------------*/

    assistantIdService(id): Observable<Assistants> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants?populate=%2A&filters%5Bid%5D=${id}`;
        return this.http.get<Assistants>(url,{headers});
    }

    assistantFormEmpService(form, employee): Observable<Assistants> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants?populate=%2A&filters%5Bform%5D=${form}&filters%5Bemployee%5D=${employee}`;
        return this.http.get<Assistants>(url,{headers});
    }

    assistantFormService(id): Observable<Assistants> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants?populate=%2A&filters%5Bform%5D=${id}`;
        return this.http.get<Assistants>(url,{headers});
    }

    createAssistantService(data): Observable<Assistants> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants`;
        return this.http.post<Assistants>(url,data, {headers});
    }

    updateAssitantService(data,id): Observable<Assistants> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants/${id}`;
        return this.http.put<Assistants>(url, data, {headers});
    }

    deleteAssitantService(id): Observable<Assistants>{
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants/${id}`;
        return this.http.delete<Assistants>(url,{headers});
    }

    /*-------------------------|
        Approvals              |
    -------------------------*/

    createApprovalService(data): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals`;
        return this.http.post<any>(url,data, {headers});
    }

    approvalFormService(id): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals?populate=%2A&filters%5Bform%5D=${id}`;
        return this.http.get<any>(url,{headers});
    }

    updateApprovalService(data,id): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals/${id}`;
        return this.http.put<any>(url, data, {headers});
    }

    deleteApprovalService(id): Observable<any>{
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals/${id}`;
        return this.http.delete<any>(url,{headers});
    }


    /*-------------------------|
        Cities                 |
    -------------------------*/

    citiesService(): Observable<City> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}cities`;
        return this.http.get<City>(url,{headers});
    }

    /*-------------------------|
        Department             |
    -------------------------*/

    departmentService(): Observable<Department> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}departments`;
        return this.http.get<Department>(url,{headers});
    }

    /*-------------------------|
        Countries              |
    -------------------------*/

    countriesService(): Observable<Country> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}countries`;
        return this.http.get<Country>(url,{headers});
    }

    /*-------------------------|
      Tipo Identificación      |
    --------------------------*/

    identificationTypesService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}identification-types`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        Regimen                |
    --------------------------*/

    regimesService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}regimes`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        Pensión                |
    --------------------------*/

    pensionService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}pensions`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        HealthcareProvider     |
    --------------------------*/

    healthcareProviderService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}healthcare-providers`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        OccupationRiskManager   |
    --------------------------*/

    occupationRiskManagerService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}occupation-risk-managers`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        compensationFundService |
    --------------------------*/

    compensationFundService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}compensation-funds`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        Workspace               |
    --------------------------*/

    workspaceService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}workspaces`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        Position                |
    --------------------------*/

    positionService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}positions`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        Genders                 |
    --------------------------*/

    gendersService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}genders`;
        return this.http.get<any>(url,{headers});
    }

     /*-------------------------|
        state Project           |
    --------------------------*/

    stateProjectService(): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}state-projects`;
        return this.http.get<any>(url,{headers});
    }

    /*-------------------------|
        Upload                 |
    -------------------------*/

    uploadService(data): Observable<Company> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}upload`;
        return this.http.post<Company>(url, data, {headers});
    }

    /*-------------------------|
        DataField              |
    -------------------------*/


    dataFieldService(name: string): Observable<any> {
        const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}data-fields?filters%5Bname%5D=${name}`;
        return this.http.get<any>(url,{headers});
    }

}

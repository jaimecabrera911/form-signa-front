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


    /*-----------------------|
        Auth                 |
    ------------------------*/

    login(identifier: string, password: string): Observable<any> {
        const url = `${environment.apiUrl}auth/local`;
        return this.http.post<any>(url, { identifier, password });
    }



    /*-------------------------|
        projects               |
     -------------------------*/

    projectService(id: number): Observable<Project> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects?populate=%2A&filters%5Bcompany%5D[id]=${id}`;
        return this.http.get<any>(url);
    }

    projectIdService(id: number): Observable<Project> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'city%2Ccompany%2Cuser%2Cstate&filters%5Bid%5D';
        const url = `${environment.apiUrl}projects?populate=${filetrs}=${id}`;
        return this.http.get<Project>(url);
    }

    createProjectService(data): Observable<Project> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects`;
        return this.http.post<Project>(url, data);
    }

    updateProjectService(data,id): Observable<Project> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}projects/${id}`;
        return this.http.put<Project>(url, data);
    }

    /*-------------------------|
        Users                  |
    --------------------------*/

    createUserService(data: any): Observable<Users> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}users`;
        return this.http.post<Users>(url, data);
    }

    userIdService(id: number): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}users=${id}`;
        return this.http.get<any>(url);
    }

    updateUsersService(data,id): Observable<Users> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}users/${id}`;
        return this.http.put<Users>(url, data);
    }


    /*-------------------------|
        Employees              |
    --------------------------*/

    employeesService(): Observable<Employee> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url);
    }

    employeUsernameService(user: string): Observable<Employee> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=profilePicture%2Ccompany%2Cuser%2Csignature&filters%5Busername%5D=${user}`;
        return this.http.get<Employee>(url);
    }

    employeesActiveService(): Observable<Employee> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5Benabled%5D=true&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url);
    }

    employeesManagerService(): Observable<Employee> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5BisManager%5D=true&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url);
    }

    employeIdService(id: number): Observable<Employee> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5Bid%5D=${id}&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url);
    }

    createEmployeeService(data): Observable<Employee> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees`;
        return this.http.post<Employee>(url, data);
    }

    updateEmployeeService(data,id): Observable<Employee> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}employees/${id}`;
        return this.http.put<Employee>(url, data);
    }

    /*-------------------------|
       Company                 |
    -------------------------*/

    companyService(): Observable<Company> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies`;
        return this.http.get<Company>(url);
    }

    companyIdService(id: number): Observable<Company> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'regime%2Ccity%2Cprojacts%2Cemployees%2Cpositions%2Cworkspaces&filters%5Bid%5D';
        const url = `${environment.apiUrl}companies?populate=${filetrs}=${id}`;
        return this.http.get<Company>(url);
    }

    createCompanyService(data): Observable<Company> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies`;
        return this.http.post<Company>(url, data);
    }

    updateCompanyService(data,id): Observable<Company> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}companies/${id}`;
        return this.http.put<Company>(url, data);
    }

    /*-------------------------|
       Forms                   |
    -------------------------*/

    formsService(): Observable<Form> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms?populate=%2A&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Form>(url);
    }

    formIdService(id): Observable<Form> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms?populate=%2A&filters%5Bid%5D=${id}`;
        return this.http.get<Form>(url);
    }

    createFormSevice(data): Observable<Form> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms`;
        return this.http.post<Form>(url, data);
    }

    updateFormService(data,id): Observable<Form> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}forms/${id}`;
        return this.http.put<Form>(url, data);
    }

     /*-------------------------|
       Templates Forms          |
    -------------------------*/

    templatesFormService(id: number): Observable<Template> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const filetrs = 'company%2Cimage&filters%5Bcompany%5D[id]';
        const url = `${environment.apiUrl}form-templates?populate=${filetrs}=${id}`;
        return this.http.get<Template>(url);
    }

    templatesIdService(code: string): Observable<Template> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}form-templates?filters%5Bcode%5D=${code}`;
        return this.http.get<Template>(url);
    }

    /*-------------------------|
        Assistants             |
    -------------------------*/

    assistantIdService(id): Observable<Assistants> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants?populate=%2A&filters%5Bid%5D=${id}`;
        return this.http.get<Assistants>(url);
    }

    assistantFormEmpService(form, employee): Observable<Assistants> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants?populate=%2A&filters%5Bform%5D=${form}&filters%5Bemployee%5D=${employee}`;
        return this.http.get<Assistants>(url);
    }

    assistantFormService(id): Observable<Assistants> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants?populate=%2A&filters%5Bform%5D=${id}`;
        return this.http.get<Assistants>(url);
    }

    createAssistantService(data): Observable<Assistants> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants`;
        return this.http.post<Assistants>(url,data);
    }

    updateAssitantService(data,id): Observable<Assistants> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants/${id}`;
        return this.http.put<Assistants>(url, data);
    }

    deleteAssitantService(id): Observable<Assistants>{
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}assistants/${id}`;
        return this.http.delete<Assistants>(url);
    }

    /*-------------------------|
        Approvals              |
    -------------------------*/

    createApprovalService(data): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals`;
        return this.http.post<any>(url,data);
    }

    approvalFormService(id): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals?populate=%2A&filters%5Bform%5D=${id}`;
        return this.http.get<any>(url);
    }

    updateApprovalService(data,id): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals/${id}`;
        return this.http.put<any>(url, data);
    }

    deleteApprovalService(id): Observable<any>{
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}approvals/${id}`;
        return this.http.delete<any>(url);
    }


    /*-------------------------|
        Cities                 |
    -------------------------*/

    citiesService(): Observable<City> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}cities`;
        return this.http.get<City>(url);
    }

    /*-------------------------|
        Department             |
    -------------------------*/

    departmentService(): Observable<Department> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}departments`;
        return this.http.get<Department>(url);
    }

    /*-------------------------|
        Countries              |
    -------------------------*/

    countriesService(): Observable<Country> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}countries`;
        return this.http.get<Country>(url);
    }

    /*-------------------------|
      Tipo Identificación      |
    --------------------------*/

    identificationTypesService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}identification-types`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        Regimen                |
    --------------------------*/

    regimesService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}regimes`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        Pensión                |
    --------------------------*/

    pensionService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}pensions`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        HealthcareProvider     |
    --------------------------*/

    healthcareProviderService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}healthcare-providers`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        OccupationRiskManager   |
    --------------------------*/

    occupationRiskManagerService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}occupation-risk-managers`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        compensationFundService |
    --------------------------*/

    compensationFundService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}compensation-funds`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        Workspace               |
    --------------------------*/

    workspaceService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}workspaces`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        Position                |
    --------------------------*/

    positionService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}positions`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        Genders                 |
    --------------------------*/

    gendersService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}genders`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        state Project           |
    --------------------------*/

    stateProjectService(): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}state-projects`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        Upload                 |
    -------------------------*/

    uploadService(data): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}upload`;
        return this.http.post<any>(url, data);
    }

    deleteUploadService(id): Observable<any>{
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}upload/files/${id}`;
        return this.http.delete<any>(url);
    }

    /*-------------------------|
        DataField              |
    -------------------------*/


    dataFieldService(name: string): Observable<any> {
        //const headers = new HttpHeaders({ 'Authorization': `Bearer ${environment.token}`});
        const url = `${environment.apiUrl}data-fields?filters%5Bname%5D=${name}`;
        return this.http.get<any>(url);
    }

}

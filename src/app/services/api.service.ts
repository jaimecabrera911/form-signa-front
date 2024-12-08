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
import { saveAs } from 'file-saver';

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

    projectService(): Observable<Project> {
        const url = `${environment.apiUrl}projects/all`;
        return this.http.get<any>(url);
    }

    projectIdService(id: number): Observable<Project> {
        const url = `${environment.apiUrl}projects/${id}`;
        return this.http.get<Project>(url);
    }

    createProjectService(data): Observable<Project> {
        const url = `${environment.apiUrl}projects`;
        return this.http.post<Project>(url, data);
    }

    updateProjectService(data,id): Observable<Project> {
        const url = `${environment.apiUrl}projects/${id}`;
        return this.http.put<Project>(url, data);
    }

    /*-------------------------|
        Users                  |
    --------------------------*/

    createUserService(data: any): Observable<Users> {
        const url = `${environment.apiUrl}users`;
        return this.http.post<Users>(url, data);
    }

    userIdService(id: number): Observable<any> {
        const url = `${environment.apiUrl}users=${id}`;
        return this.http.get<any>(url);
    }

    updateUsersService(data,id): Observable<Users> {
        const url = `${environment.apiUrl}users/${id}`;
        return this.http.put<Users>(url, data);
    }


    /*-------------------------|
        Employees              |
    --------------------------*/

    employeesService(): Observable<Employee> {
        const url = `${environment.apiUrl}employees`;
        return this.http.get<Employee>(url);
    }

    employeUsernameService(user: string): Observable<Employee> {
        const url = `${environment.apiUrl}employees?populate=profilePicture%2Ccompany%2Cuser%2Csignature&filters%5Busername%5D=${user}`;
        return this.http.get<Employee>(url);
    }

    employeesActiveService(): Observable<Employee> {
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5Benabled%5D=true&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url);
    }

    employeesManagerService(): Observable<Employee> {
        const url = `${environment.apiUrl}employees?populate=%2A&filters%5BisManager%5D=true&filters%5Bcompany%5D=${this.company}`;
        return this.http.get<Employee>(url);
    }

    employeIdService(id: number): Observable<Employee> {
        const url = `${environment.apiUrl}employees/${id}`;
        return this.http.get<Employee>(url);
    }

    createEmployeeService(data): Observable<Employee> {
        const url = `${environment.apiUrl}employees`;
        return this.http.post<Employee>(url, data);
    }

    updateEmployeeService(data,id): Observable<Employee> {
        const url = `${environment.apiUrl}employees/${id}`;
        return this.http.put<Employee>(url, data);
    }

    /*-------------------------|
       Company                 |
    -------------------------*/

    companyService(): Observable<any> {
        const url = `${environment.apiUrl}companies/all`;
        return this.http.get<any>(url);
    }

    companyIdService(id: string): Observable<Company> {
        const url = `${environment.apiUrl}companies/${id}`;
        return this.http.get<Company>(url);
    }

    createCompanyService(data): Observable<Company> {
        const url = `${environment.apiUrl}companies`;
        return this.http.post<Company>(url, data);
    }

    updateCompanyService(data,id): Observable<Company> {
        const url = `${environment.apiUrl}companies/${id}`;
        return this.http.put<Company>(url, data);
    }

    /*-------------------------|
       Forms                   |
    -------------------------*/

    formsService(): Observable<Form> {
        const url = `${environment.apiUrl}form/all`;
        return this.http.get<Form>(url);
    }

    formsIdProjectService(id): Observable<Form> {
        const url = `${environment.apiUrl}forms?populate=project&filters%5Bproject%5D=${id}`;
        return this.http.get<Form>(url);
    }

    formIdService(id): Observable<Form> {
        const url = `${environment.apiUrl}form/${id}`;
        return this.http.get<Form>(url);
    }

    createFormSevice(data): Observable<Form> {
        const url = `${environment.apiUrl}form`;
        return this.http.post<Form>(url, data);
    }

    updateFormService(data,id): Observable<Form> {
        const url = `${environment.apiUrl}form/${id}`;
        return this.http.put<Form>(url, data);
    }

     /*-------------------------|
        Reportes                |
     -------------------------*/
     exportPDF(data): Observable<any> {
        const url = `${environment.apiUrl}pdf/generate`;
        return this.http.post<any>(url, data);
    }

    downloadPDF(data): Observable<Blob> {
        const url = `${environment.apiUrl}pdf/generate`;
        return this.http.post(url, data, { responseType: 'blob' });
    }

    savePDF(blob: Blob, filename: string): void {
        saveAs(blob, filename);
      }

     /*-------------------------|
        Templates Forms         |
    --------------------------*/

    templatesFormService(): Observable<Template> {
        const url = `${environment.apiUrl}form-templates/all`;
        return this.http.get<Template>(url);
    }

    templatesIdService(code: string): Observable<Template> {
        const url = `${environment.apiUrl}form-templates/${code}`;
        return this.http.get<Template>(url);
    }

    /*-------------------------|
        Assistants             |
    -------------------------*/

    assistantIdService(id): Observable<Assistants> {
        const url = `${environment.apiUrl}assistant/${id}`;
        return this.http.get<Assistants>(url);
    }

    assistantFormEmpService(form, employee): Observable<Assistants> {
        const url = `${environment.apiUrl}/${form}/${employee}`;
        return this.http.get<Assistants>(url);
    }

    assistantFormService(id): Observable<Assistants> {
        const url = `${environment.apiUrl}assistant/form/${id}`;
        return this.http.get<Assistants>(url);
    }

    createAssistantService(data): Observable<Assistants> {
        const url = `${environment.apiUrl}assistant`;
        console.log('DATA INSERT ',data);
        const formData = new FormData();
        formData.append('body', JSON.stringify(data));  // Por ejemplo un campo de texto
        if(data.file !== null || data.file !== undefined){
            formData.append('file', data.file);
        }
        return this.http.post<Assistants>(url,formData);
    }

    updateAssitantService(data,id): Observable<Assistants> {
        console.log('DATA  ',data);
        const url = `https://forma-figma-api.vercel.app/assistant/${id}`;
        //const url = `https://hxhc2v74-3000.use2.devtunnels.ms/assistant/${id}`;
        //const url = `${environment.apiUrl}assistant/${id}`;
        return this.http.put<Assistants>(url, data, { headers: { 'accept': '*/*' } });
    }

    deleteAssitantService(id): Observable<Assistants>{
        const url = `${environment.apiUrl}assistant/${id}`;
        return this.http.delete<Assistants>(url);
    }

    /*-------------------------|
        Approvals              |
    -------------------------*/

    createApprovalService(data): Observable<any> {
        const url = `${environment.apiUrl}approvals`;
        return this.http.post<any>(url,data);
    }

    approvalFormService(id): Observable<any> {
        const url = `${environment.apiUrl}approvals/${id}`;
        return this.http.get<any>(url);
    }

    updateApprovalService(data,id): Observable<any> {
        const url = `${environment.apiUrl}approvals/${id}`;
        return this.http.put<any>(url, data);
    }

    deleteApprovalService(id): Observable<any>{
        const url = `${environment.apiUrl}approvals/${id}`;
        return this.http.delete<any>(url);
    }


    /*-------------------------|
        Cities                 |
    -------------------------*/

    citiesService(departmentCode: any): Observable<City> {
        const url = `${environment.apiUrl}locations/cities/${departmentCode}`;
        return this.http.get<City>(url);
    }

    /*-------------------------|
        Department             |
    -------------------------*/

    departmentService(countryCode: any): Observable<Department> {
        const url = `${environment.apiUrl}locations/departments/${countryCode}`;
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
        const url = `${environment.apiUrl}identifications`;
        return this.http.get<any>(url);
    }


     /*-------------------------|
        Social Entities                |
    --------------------------*/

    socialEntities(type: string): Observable<any> {
        const url = `${environment.apiUrl}social-entities/type/${type}`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        Regimen                |
    --------------------------*/

    regimesService(): Observable<any> {
        const url = `${environment.apiUrl}regimes/all`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        Pensión                |
    --------------------------*/

    pensionService(): Observable<any> {
        const url = `${environment.apiUrl}pensions`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        HealthcareProvider     |
    --------------------------*/

    healthcareProviderService(): Observable<any> {
        const url = `${environment.apiUrl}healthcare-providers`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        OccupationRiskManager   |
    --------------------------*/

    occupationRiskManagerService(): Observable<any> {
        const url = `${environment.apiUrl}occupation-risk-managers`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        compensationFundService |
    --------------------------*/

    compensationFundService(): Observable<any> {
        const url = `${environment.apiUrl}compensation-funds`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        Workspace               |
    --------------------------*/

    workspaceService(): Observable<any> {
        const url = `${environment.apiUrl}workspaces`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        Position                |
    --------------------------*/

    positionService(): Observable<any> {
        const url = `${environment.apiUrl}positions`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        Genders                 |
    --------------------------*/

    gendersService(): Observable<any> {
        const url = `${environment.apiUrl}genders/all`;
        return this.http.get<any>(url);
    }

     /*-------------------------|
        state Project           |
    --------------------------*/

    stateProjectService(): Observable<any> {
        const url = `${environment.apiUrl}state-projects`;
        return this.http.get<any>(url);
    }

    /*-------------------------|
        Upload                 |
    -------------------------*/

    uploadService(data): Observable<any> {
        //const url = `${environment.apiUrl}employees/files`;
        const url = 'https://forma-figma-api.vercel.app/employees/files';
        return this.http.post<any>(url, data);
    }

    deleteUploadService(id): Observable<any>{
        const url = `${environment.apiUrl}files/${id}`;
        return this.http.delete<any>(url);
    }

    /*-------------------------|
        DataField              |
    -------------------------*/


    dataFieldService(): Observable<any> {
        const url = `${environment.apiUrl}data/all`;
        return this.http.get<any>(url);
    }

    dataFieldIdService(id: string): Observable<any> {
        const url = `${environment.apiUrl}data/${id}`;
        return this.http.get<any>(url);
    }

}

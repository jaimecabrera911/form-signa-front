/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @angular-eslint/component-class-suffix */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { Form } from 'app/models/form';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';
import { ListItemsFormComponent } from './list-items-form.component';

const typeValues = [
    { id: 1, value: 'string' },
    { id: 2, value: 'integer' },
    { id: 3, value: 'date' },
    { id: 4, value: 'dateTime' },
    { id: 5, value: 'boolean' },
    { id: 6, value: 'array' },
    { id: 7, value: 'object' },
    { id: 8, value: 'radio' },
    { id: 9, value: 'textArea' }
];

@Component({
    selector: 'app-training-forms',
    template: '<p></p>',
    styleUrls: []
})
export abstract class ControllerFormsComponent extends ListItemsFormComponent implements OnInit {

    title: string = '';
    subtitle: string = '';
    swaAlert = new SwalAlert();
    id: any;
    formInit: FormGroup;
    code: string;
    validateItems: any[] = [];
    apiItems$: Observable<any>;
    itemsCurrent: any[] = [];
    filesItems: any[] = [];
    infoForm: any[] = [];
    assistantsForm: any = [];
    approvalsForm: any = [];

    iterableColumns: TableItems[] = [
        { name: 'firstName', name2: false, styleEnable: false, label: 'Nombres', function: false, functionName: false, item: false },
        { name: 'firstSurname', name2: false, styleEnable: false, label: ' .', function: false, functionName: false, item: false },
        { name: 'secondSurname', name2: false, styleEnable: false, label: ' .', function: false, functionName: false, item: false },
        { name: 'identificationNumber', name2: false, styleEnable: false, label: 'Documento', function: false, functionName: false, item: false },
        { name: 'position', name2: 'name', styleEnable: false, label: 'Cargo', function: false, functionName: false, item: true },
        { name: 'isSignature', name2: false, styleEnable: false, label: 'Estado', function: false, functionName: false, item: true },
        { name: 'id', name2: false, styleEnable: false, label: 'Firma', function: true, functionName: 'isSignature', item: false }
    ];

    constructor(
        protected _formBuilder: FormBuilder,
        protected api: ApiService
    ) {
        super(api);
    }

    override ngOnInit(): void {
        const str = window.location.pathname;
        this.getTemplateId();
        this.apiItems$ = this.api.employeesService();
        this.getFormId();
        super.ngOnInit();
    }

    async getTemplateId(): Promise<void> {
        await this.api.templatesIdService(this.code).subscribe({
            next: (items: any) => {
                if (items.data) {
                    this.infoForm = items.data;
                    this.title = `${items.data[0].code} ${items.data[0].name}`;
                }
            }, error: (e: any) => console.error(e)
        });
    }

    async getFormId(): Promise<void> {
        if (this.id) {
            await this.api.formIdService(this.id).subscribe({
                next: (response: any) => {
                    this.itemsCurrent = response.data;
                    this.filesItems = this.itemsCurrent[0]?.evidences ? this.itemsCurrent[0]?.evidences : '';
                    this.formInit.patchValue({
                        code: this.itemsCurrent[0].code,
                        uid: this.itemsCurrent[0].uid,
                        name: this.itemsCurrent[0].name,
                        version: this.itemsCurrent[0].version,
                        project: this.itemsCurrent[0].project.id,
                        evidences: this.itemsCurrent[0]?.evidences ? this.itemsCurrent[0]?.evidences : null,
                        assistants: this.itemsCurrent[0]?.assistants ? this.itemsCurrent[0]?.assistants : null,
                    });
                    this.getForm();
                    this.getAssistantsId();
                    this.getApprovalsId();
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }

    getTypeValue = (id: any) => typeValues.filter(item => item.id === id).map(item => item.value);
    getForm(): void { }
    getValueField(code: any): any { return this.itemsCurrent[0].fields.filter(item => item.name === code).map(item => item.value); };
    cleanSelect(item): void { return item.pop(); }
    updateValueForm(codeField: any, valueField: any, typeField: any): void {
        this.validateItems.push({ name: codeField, value: valueField, type: typeField });
        this.formInit.value.fields = [...this.validateItems];
    }


    assignFields(): void {
        const form = this.formInit.value;
        form.fields.forEach((items: any) => {
            this.updateValueForm(items.name, form.fieldsItems[items.name], items.type);
        });
    }

    validationSubmit(): void {
        if (this.formInit.invalid) {
            return;
        }
        if (this.formInit.value.filesUpload) {
            this.uploadSave(this.formInit.value.filesUpload);
        } else {
            this.formSave();
        }
    }

    getAssistantsId(): void {
        if (this.id) {
            this.api.assistantFormService(this.id).subscribe({
                next: (response: any) => {
                    this.assistantsForm = response.data;
                }, error: (e: any) => console.log('')
            });
        }
    }

    getApprovalsId(): void {
        if (this.id) {
            const itemsSelect: any[] = [];
            this.api.approvalFormService(this.id).subscribe({
                next: (response: any) => {
                    this.approvalsForm = response.data;
                }, error: (e: any) => console.log('')
            });
        }
    }

    uploadSave(file): void {
        if (file) {
            this.api.uploadService(file).subscribe({
                next: (data: any) => {
                    const form = this.formInit.value;
                    if (data) {
                        const filesId = data.map((items: any) => items.id);
                        if (this.id) {
                            const filesCurrent: string[] = [];
                            this.itemsCurrent[0]?.evidences?.forEach((item: any) => filesCurrent.push(item.id));
                            filesId.forEach((id: any) => filesCurrent.push(id));
                            this.assignUpload(filesCurrent);
                        } else {
                            this.assignUpload(filesId);
                        }
                    }
                }, error: (e: any) => this.swaAlert.toastErrorUpload()
            });
        }
    }

    assignUpload(files): void {
        const form = this.formInit.value;
        form.evidences = files;
        this.formSave();
    }


    formSave(): void {
        this.assignFields();
        let observable: Observable<Form>;
        if (this.id) {
            observable = this.api.updateFormService(this.formInit.value, this.id);
        } else {
            observable = this.api.createFormSevice(this.formInit.value);
        }
        observable.subscribe({
            next: (response: any) => {
                if (response) {
                    if (this.formInit.value.trainingApproval.length > 0) {
                        this.assignApprovals(response.data.id);
                    }

                    if (this.formInit.value.assignedAssistants.length > 0) {
                        this.validationAssitant(response.data.id);
                    } else {
                        const toast = this.swaAlert.toast();
                        toast.fire({ icon: 'success', title: 'Formulario guardado correctamente' }).then((() => {
                            location.href = `/forms-project/${this.code.toLowerCase()}/edit/${response.data.id}`;
                        }));
                    }

                }
            }, error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

    assignApprovals(idForm): void {
        this.formInit.value.trainingApproval.forEach((element: any, i: number) => {
            if(element.id && this.id){
                console.log('id Approval ',element.id,' form ',this.id);
                Object.assign(this.formInit.value.trainingApproval[i], { form: this.id });
            }else{
                console.log('create',);
                Object.assign(this.formInit.value.trainingApproval[i], { form: idForm });
            }
        });
        if(this.id){
            const idSelect = this.formInit.value.trainingApproval.map((item: any) => item.id);
            const filterDelete = this.approvalsForm.filter((item: any) => !idSelect.includes(item.id)).map((item: any) => item.id);
            filterDelete.forEach((element: any) => {
                this.deleteApproval(element);
            });
        }
        this.formInit.value.trainingApproval.forEach((request: any) => {
            this.saveApproval(request);
        });
    }

    saveApproval(request: any): void {
        let observable: Observable<any>;
        console.log('request ',request,' id ',request.id);
        if (request.id) {
            console.log('edit ');
            observable = this.api.updateApprovalService(request, request.id);
        } else {
            observable = this.api.createApprovalService(request);
        }
        observable.subscribe({
            next: (response: any) => {
                if (response) {
                    const toast = this.swaAlert.toast();
                    toast.fire({ icon: 'success', title: 'Aprobaciones  guardadas correctamente' });
                }
            }, error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

    deleteApproval(id: number): void{
        this.api.deleteApprovalService(id).subscribe({
            next: (response) => { console.log('delte ',response);},
            error: (e: any) => console.log(e)
        });
    }


    validationAssitant(idForm): void {
        const form = this.formInit.value;
        if (form.assignedAssistants.length > 0) {
            form.assistants = null;
            form.assistants = form.assignedAssistants;
            form.assignedAssistants.forEach((element: any) => {
                this.saveAssistants(element, idForm);
            });
            if(this.id){
                const idSelect = this.formInit.value.assignedAssistants.map((item: any) => item);
                const filterDelete = this.assistantsForm.filter((item: any) => !idSelect.includes(item.employee.id)).map((item: any) => item.id);
                filterDelete.forEach((element: any) => {
                    this.deleteAssistant(element);
                });
            }
        } else {
            const toast = this.swaAlert.toast();
            toast.fire({ icon: 'success', title: 'Formulario guardado correctamente' }).then((() => {
                location.href = `/forms-project/${this.code.toLowerCase()}/edit/${idForm}`;
            }));
        }
    }

    saveAssistants(idEmployee, idForm): void {
        const validIdEmp = this.assistantsForm.filter((item: any) => item.employee.id === idEmployee).map((item: any) => item.employee.id);
        const request: any = { employee: idEmployee, signature: null, date: new Date(), isSigned: false, form: idForm };
        if (validIdEmp[0] === undefined || !validIdEmp[0]) {
            this.api.createAssistantService(request).subscribe({
                next: (response) => {
                    const toast = this.swaAlert.toast();
                    toast.fire({ icon: 'success', title: 'Asistentes  asignados correctamente' }).then((() => {
                        location.href = `/forms-project/${this.code.toLowerCase()}/edit/${idForm}`;
                    }));

                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }

    }

    deleteAssistant(id: number): void{
        this.api.deleteAssitantService(id).subscribe({
            next: (response) => { console.log('delte ',response);},
            error: (e: any) => console.log(e)
        });
    }
}

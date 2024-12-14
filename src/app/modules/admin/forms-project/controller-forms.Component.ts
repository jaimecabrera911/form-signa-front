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
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ModalImageComponent } from '@fuse/components/modal-image/modal-image.component';

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
    version: string;
    validateItems: any[] = [];
    validateArrayItems: any[] = [];
    apiItems$: Observable<any>;
    itemsCurrent: any = [];
    filesItems: any[] = [];
    filesArrays: any = {};
    infoForm: any | any[]= [];
    assistantsForm: any = [];
    approvalsForm: any = [];
    filesUploadDelete: any[] = [];
    function: any = new Path();
    modView: boolean = true;
    days: any = { 'monday': 'Lunes', 'tuesday': 'Martes', 'wednesday': 'Miercoles', 'thursday': 'Jueves', 'friday': 'Viernes', 'saturday': 'Sabado', 'sunday': 'Domingo' };

    iterableColumns: TableItems[] = [
        { name: 'fullName', name2: false, styleEnable: false, label: 'Nombres', function: false, functionName: false, item: false },
        { name: 'identificationNumber', name2: false, styleEnable: false, label: 'Documento', function: false, functionName: false, item: false },
        { name: 'position', name2: 'name', styleEnable: false, label: 'Cargo', function: false, functionName: false, item: true },
        { name: 'isSigned', name2: false, styleEnable: false, label: 'Estado', function: false, functionName: false, item: true },
        { name: 'uid', name2: false, styleEnable: false, label: 'Firma', function: true, functionName: 'isSignature', item: false }
    ];

    constructor(
        protected _formBuilder: FormBuilder,
        protected matDialog: MatDialog,
        protected api: ApiService
    ) {
        super(api);
    }

    override ngOnInit(): void {
        const str = window.location.pathname;
        this.getTemplateId();
        this.getLabels();
        this.getParam(this.code.toLowerCase());
        this.apiItems$ = this.api.employeesService();
          this.api.assistantFormService(this.id);
        this.getFormId();
        super.ngOnInit();
    }

    async getTemplateId(): Promise<void> {
        await this.api.templatesIdService(this.code).subscribe({
            next: (items: any) => {
                if (items) {
                    this.infoForm = items;
                    this.title = `${items?.code} ${items?.name}`;
                    this.code = `${items?.code}`;
                    this.version = `${items?.version}`;
                }
            }, error: (e: any) => console.error(e)
        });
    }

    async getFormId(): Promise<void> {
        if (this.id) {
            await this.api.formIdService(this.id).subscribe({
                next: (response: any) => {
                    this.itemsCurrent = response;
                    this.filesItems = this.itemsCurrent?.evidences ? this.itemsCurrent?.evidences : '';
                    this.filesArrays = this.itemsCurrent?.data ? this.itemsCurrent?.data : '';
                    this.formInit.patchValue({
                        code: this.itemsCurrent?.code,
                        uid: this.itemsCurrent?.uid,
                        name: this.itemsCurrent?.name,
                        version: this.itemsCurrent?.version,
                        projectUid: this.itemsCurrent?.project?.uid,
                        evidences: this.itemsCurrent?.evidences ? this.itemsCurrent?.evidences : null,
                        assistants: this.itemsCurrent?.assistants ? this.itemsCurrent?.assistants : null,
                    });
                    this.getForm();
                    this.getAssistantsId();
                    this.getApprovalsId();
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });

            this.getView();
        }
    }

    getView(): void {
        const route = window.location.pathname;
        const type = route.split('/');
        if (type[3] === 'view') {
            this.formInit.disable();
            this.formInit.controls['data'].disable();
            this.modView = false;
        }
    }
    async generatePDF(): Promise<void> {
        if (this.id) {
            const formItems = {data: {...this.itemsCurrent}};
            this.api.downloadPDF(formItems).subscribe((blob) => {
                this.api.savePDF(blob, 'output.pdf');
              });
        }
    }

    getTypeValue = (id: any) => typeValues.filter(item => item.id === id)
        .map(item => item.value);

    getForm(): void { }

    getValueField(code: any): any {
        return this.itemsCurrent.fields
            .filter(item => item.name === code)
            .map(item => item.value);
    };

    getLabel(code: any): any {
        const param = this.paramLabels?.filter((item: any) => item.code === code)
            .map((item: any) => item.name ? item.name : '');
        return param[0] ? param[0] : '';
    }

    getParamLabel(code: any): any {
        const param = this.paramsForms?.filter((item: any) => item.code === code)
            .map((item: any) => item.name ? item.name : '');
        return param[0] ? param[0] : '';
    }

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

        this.validDeleFile();
        const uploadFiles = this.formInit?.value?.filesUpload?.filter((item: any) => item.id === null)
                            .map((item: any) => item.filesUploads ? item.filesUploads : null);
        if (this.formInit?.value?.filesUpload) {
            if (uploadFiles[0] !== undefined) {
                this.uploadSave(uploadFiles[0]);
            } else {
                this.formSave();
            }
        } else {
            this.formSave();
        }
    }

    async getAssistantsId(): Promise<void> {
        if (this.id) {
            await this.api.assistantFormService(this.id).subscribe({
                next: (response: any) => {
                    this.assistantsForm = response;
                }, error: (e: any) => console.log('')
            });
        }
    }

    async getApprovalsId(): Promise<void> {
        if (this.id) {
            const itemsSelect: any[] = [];
            await this.api.approvalFormService(this.id).subscribe({
                next: (response: any) => {
                    this.approvalsForm = response;
                }, error: (e: any) => console.log('')
            });
        }
    }

    /*---- Uploads ---*/

    async uploadSave(file): Promise<void> {
        if (file) {
            await this.api.uploadService(file).subscribe({
                next: (data: any) => {
                    const form = this.formInit.value;
                    if (data) {
                        const filesId = data.map((items: any) => items.id);
                        if (this.id) {
                            const filesCurrent: string[] = [];
                            this.formInit.value.evidences?.forEach((item: any) => filesCurrent.push(item.id));
                            filesId.forEach((id: any) => filesCurrent.push(id));
                            const validateDeleteItems = filesCurrent.filter((item: any) => !this.filesUploadDelete.includes(item));
                            this.assignUpload(validateDeleteItems);
                        } else {
                            this.assignUpload(filesId);
                        }
                    }
                }, error: (e: any) => this.swaAlert.toastErrorUpload()
            });
        }
    }

    validDeleFile(): void {
        if (this.id) {
            if (this.formInit.value.filesUpload !== undefined && this.formInit.value.filesUpload !== null) {
                const uploadDelete = this.formInit.value.filesUpload.filter((item: any) => item.id !== null && item.stateDelete === true).map((item: any) => item.id);
                if (uploadDelete.length > 0) {
                    const vadidDeleteFile = this.itemsCurrent?.evidences.filter((item: any) => !uploadDelete.includes(item.id));
                    if (vadidDeleteFile) {
                        this.formInit.value.evidences = vadidDeleteFile;
                        this.filesUploadDelete = uploadDelete;
                        uploadDelete?.forEach((element: any) => {
                            this.deleteUpload(element);
                        });
                    }
                }
            }
        }
    }

    assignUpload(files): void {
        const form = this.formInit.value;
        this.formInit.value.evidences = files;
        this.formSave();
    }

    async deleteUpload(id: number): Promise<void> {
        await this.api.deleteUploadService(id).subscribe({
            next: (response) => { console.log('delete upload ', response); },
            error: (e: any) => console.log(e)
        });
    }


    /*---- Approvals ---*/

    assignApprovals(idForm): void {
        const approval = this.formInit.value?.trainingApproval || [];
        const trainingApproval = approval
                                      .map((item: any) => ({...item, formId: idForm })) || '';
        if (this.id) {
            const idSelect = trainingApproval?.map((item: any) => item.id);
            const filterDelete = this.approvalsForm.filter((item: any) =>
                                !idSelect?.includes(item.id))
                                         .map((item: any) => item.id);

            filterDelete.forEach((element: any) => {
                this.deleteApproval(element);
            });
        }
        trainingApproval.forEach((request: any) => {
            this.saveApproval(request);
        });
    }

    async saveApproval(request: any): Promise<void> {
        let observable: Observable<any>;
        if (request.id) {
            observable = await this.api.updateApprovalService(request, request.id);
        } else {
            observable = await this.api.createApprovalService(request);
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

    async deleteApproval(id: number): Promise<void> {
        await this.api.deleteApprovalService(id).subscribe({
            next: (response) => { console.log('delete ', response); },
            error: (e: any) => console.log(e)
        });
    }


    /*---- Assistants ---*/

    validationAssitant(idForm): void {
        const form = this.formInit.value;
        form.assistants = null;
        form.assistants = form.assignedAssistants;

        if (this.id) {
            const idSelect = this.formInit.value.assignedAssistants.map((item: any) => item);
            const filterDelete = this.assistantsForm.filter((item: any) => !idSelect.includes(item.employee.uid))
                                                    .map((item: any) => item.id);
            filterDelete.forEach((element: any) => {
                this.deleteAssistant(element);
            });
        }

        form.assignedAssistants.forEach((element: any) => {
            this.saveAssistants(element, idForm);
        });
    }

    async saveAssistants(idEmployee, idForm): Promise<void> {
        const validIdEmp =  this.assistantsForm ? this.assistantsForm?.filter((item: any) => item?.employee?.uid === idEmployee)
                                               .map((item: any) => item?.employee?.uid) : '';
        const request = { formId: idForm , employeeUid: idEmployee };
        if (validIdEmp.length <= 0){
            await this.api.createAssistantService(request).subscribe({
                next: (response) => {
                    if (response) {
                        const toast = this.swaAlert.toast();
                        toast.fire({ icon: 'success', title: 'Asistentes  asignados correctamente' }).then((() => {
                            location.href = `/forms-project/${this.code.toLowerCase()}/edit/${idForm}`;
                        }));
                    }
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }

    async deleteAssistant(id: number): Promise<void> {
        await this.api.deleteAssitantService(id).subscribe({
            next: (response) => { console.log('delete ', response); },
            error: (e: any) => console.log(e)
        });
    }

    async formSave(): Promise<void> {
        const form = this.formInit.value;
        form.name = this.title;
        form.code = this.code;
        form.version = '1';
        this.assignFields();

        let observable: Observable<Form>;
        if (this.id) {
            observable = await this.api.updateFormService(this.formInit.value, this.id);
        } else {
            observable = await this.api.createFormSevice(this.formInit.value);
        }
        observable.subscribe({
            next: (response: any) => {
                if (response) {
                    this.assignApprovals(response.id);
                    this.validationAssitant(response.id);

                    const toast = this.swaAlert.toast();
                    toast.fire({ icon: 'success', title: 'Formulario guardado correctamente' }).then((() => {
                        location.href = `/forms-project/${this.code.toLowerCase()}/edit/${response.id}`;
                    }));
                }
            }, error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

    getPreview(item: any): void {
        const dialogConfig = new MatDialogConfig();
        dialogConfig.width = '50%';
        dialogConfig.data = {
            image: item,
        };
        this.matDialog.open(ModalImageComponent, dialogConfig);
    }
}

import { ListItemsComponent } from 'app/components/formasigna/list-items/list-items.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { Employee } from 'app/models/employee';
import { ApiService } from 'app/services/api.service';
import { Observable, map } from 'rxjs';

import { environment } from 'environments/environment';
import { Users } from 'app/models/users';
import { Functions } from 'app/components/functions/functions';
import { MatSelectChange } from '@angular/material/select';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends ListItemsComponent implements OnInit {
    colums: any = [];
    title = new Path().getModule();
    function: any = new Functions();
    subtitle = 'Adicionar de empleados';
    searchPanel = false;
    id: any = 0;
    swaAlert = new SwalAlert();
    nameEmployee: string = '';
    imageProfile: any = '';
    imageSignature: any = '';
    usernameValidate: any = '';
    filesItems: any[] = [];
    filesCurrent: string[] = [];
    uploadProfile: boolean = true;
    showImage: boolean = true;
    validate: boolean = false;
    filesUploadDelete: any[] = [];
    checkUpload: any[] = [{ profile: false, signature: false, files: false }];
    date: any;
    modView: boolean = true;

    formInit: FormGroup = this._formBuilder.group({
        identificationType: new FormControl('', [Validators.required]),
        identificationNumber: new FormControl('', [Validators.required]),
        firstName: new FormControl('', [Validators.required]),
        secondName: new FormControl(''),
        firstSurname: new FormControl('', [Validators.required]),
        secondSurname: new FormControl(''),
        fullName: new FormControl(''),
        birthdate: new FormControl(),
        email: new FormControl('', [Validators.required]),
        address: new FormControl('', [Validators.required]),
        cellphoneNumber: new FormControl('', [Validators.required]),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
        position: new FormControl(''),
        contactName: new FormControl(''),
        contactNumber: new FormControl(''),
        enable: new FormControl(true),
        user: new FormControl(),
        isManager: new FormControl(),
        company: new FormControl(),
        eps: new FormControl(''),
        arl: new FormControl(''),
        pension: new FormControl(''),
        ccf: new FormControl(''),
        workspace: new FormControl(''),
        gender: new FormControl(''),
        city: new FormControl('', [Validators.required]),
        birthCountry: new FormControl(1),
        profilePicture: new FormControl(),
        dateAdmission: new FormControl(''),
        withdrawalDate: new FormControl(''),
        signature: new FormControl(),
        signatureUpload: new FormControl(null),
        profilePictureUpload: new FormControl(null),
        files: new FormControl(),
        filesUpload: new FormControl(null),
        showUpload: new FormControl(false),
        username: new FormControl()
    });


    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        protected api: ApiService
    ) {
        super(api);
    }

    override ngOnInit(): void {
        this.id = this.activatedRouter.snapshot?.paramMap.get('id');
        this.getCompanies();
        this.getCities(11);
        this.getIdentificationTypes();
        this.getHealthcareProvider();
        this.getOccupationRiskManager();
        this.getCompensationFund();
        this.getPension();
        this.getGenders();
        this.getCountries();
        this.getDepartments('057');
        this.getWorkspace();
        this.getPosition();
        this.getEmployees();
        this.getLabels();
        super.ngOnInit();
        this.getEmployeesId();
        this.nameEmployee = this.formInit.value.names;
        this.date = new Date();
    }

    async getEmployeesId(): Promise<void> {
        if (this.id) {
            await this.api.employeIdService(this.id).subscribe({
                next: (items: any) => {
                    console.log('emp id',items);
                    this.setFormEmployees(items);
                    this.getView();
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }

    setFormEmployees(form): void {
        this.formInit.patchValue({
            identificationNumber: form?.identificationNumber ? form?.identificationNumber : '',
            firstName: form?.firstName ? form?.firstName : '',
            secondName: form?.secondName ? form?.secondName : '',
            firstSurname: form?.firstSurname ? form?.firstSurname : '',
            secondSurname: form?.secondSurname ? form?.secondSurname : '',
            birthdate: form?.birthdate ? form?.birthdate : '',
            email: form?.email ? form?.email : '',
            address: form?.address ? form?.address : '',
            cellphoneNumber: form?.cellphoneNumber ? form?.cellphoneNumber : '',
            phoneNumber: form?.phoneNumber ? form?.phoneNumber : '',
            contactName: form?.contactName ? form?.contactName : '',
            contactNumber: form?.contactNumber ? form?.contactNumber : '',
            enabled: form?.enabled ? form?.enabled : '',
            dateAdmission: form?.dateAdmission ? form?.dateAdmission : '',
            withdrawalDate: form?.withdrawalDate ? form?.withdrawalDate : '',
            username: form?.username ? form?.username : '',
            isManager: form?.isManager ? form?.isManager : false,
            profilePicture: form?.profilePicture ? form?.profilePicture.uid : null,
            signature: form?.signature ? form?.signature.id : null,
            files: form?.files ? form?.files.map((items: any) => items.uid) : null,
            identificationType: form?.identificationType?.code ? form?.identificationType?.code : '',
            position: form?.position?.code ? form?.position.code : '',
            company: form?.company?.uid ? form?.company?.uid : '',
            eps: form?.eps?.name ? form?.eps?.name : '',
            pension: form?.pension?.name ? form?.pension?.name : '',
            arl: form?.arl?.name ? form?.arl?.name : '',
            ccf: form?.ccf?.name ? form?.ccf?.name : '',
            workspace: form?.workspace?.id ? form?.workspace?.id : '',
            gender: form?.gender?.code ? form?.gender?.code : '',
            city: form?.city?.code ? form?.city?.code : '',
            birthCountry: form?.birthCountry?.code ? form?.birthCountry?.code : '',
            user: form?.user?.id ? form?.user?.id : null
        });
        this.imageProfile = form?.profilePicture[0] ? form?.profilePicture[0].url : null;
        if (this.imageProfile) {
            this.uploadProfile = false;
        }
        this.imageSignature = form?.signature ? form?.signature[0].url : null;
        this.filesItems = form?.files ? form?.files : '';
        this.filesCurrent = form?.files ? form?.files.map((items: any) => items.id) : [];
        this.usernameValidate = form?.username ? form?.username : '';
    }

    getView(): void {
        const route = window.location.pathname;
        const type = route.split('/');
        if (type[2] === 'view') {
            this.formInit.disable();
            this.modView = false;
        }
    }

    urlImage(url: any): string {

        return url;
    }

    filterParamLabel(code: any): any {
        const param = this.paramLabels?.filter((item: any) => item.code === code)
            .map((item: any) => item.name ? item.name : '');
        return param[0] ? param[0] : '';
    }

    test12(event: Event): void {
        console.log('event ',event);
    }



    validateFilesUpload(data: any): any {
        const filesId = data.map((items: any) => items.id);
        if (this.id) {
            filesId.forEach((num: any) => this.filesCurrent.push(num));
            const validateDeleteItems = this.filesCurrent.filter((item: any) => !this.filesUploadDelete.includes(item));
            const items = validateDeleteItems;
        } else {
            const items = filesId.forEach((num: any) => this.filesCurrent.push(num));
        }
    }

   /* async validateExistingUser(): Promise<void> {
        if (!this.id) {
            const form = this.formInit.value;
            await this.api.employeUsernameService(form.username).subscribe({
                next: (response: any) => {
                    if (response.data.length > 0) {
                        if (response.data[0].username === form.username) {
                            this.swaAlert.toastErrorUser();
                            return;
                        }
                    } else {
                        this.validateUser();
                        this.validateFiles();
                    }
                }, error: (e: any) => console.log(e)
            });
        } else {
            this.validateUser();
            this.validateFiles();
        }
    }*/

    onSubmit(): void {
        const form = this.formInit.value;
        if (this.formInit.invalid) {
            this.validate = true;
            return;
        }
        this.formSave();
    }


    async validateUser(): Promise<void> {
        const form = this.formInit.value;
        const user: any = { username: this.formInit.value.username, email: this.formInit.value.email, password: '', role: 3 };
        const userUpdate: any = { username: this.formInit.value.username, email: this.formInit.value.email };
        user.username = form.email;
        user.email = form.email;
        //user.password = form.identificationNumber;
        let observable: Observable<Users>;

        if (!this.id || (this.id && form.username !== this.usernameValidate)) {
            if (form.user) {
                observable = await this.api.updateUsersService(userUpdate, form.user);
            } else {
                observable = await this.api.createUserService(user);
            }
            observable.subscribe({
                next: (item: any) => {
                    this.formInit.value.user = item.id;
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }


    validateFiles(uid: any): any {
        this.validDeleFile();
        const form = this.formInit.value;
        const formData = new FormData();
        if (form.profilePictureUpload.length > 0 || form.signatureUpload.length > 0 || form.filesUpload.length > 0) {
            if (form.profilePictureUpload) {
                formData.append('files', this.formInit.value.profilePictureUpload.get('files'));
                formData.append('field', 'profilePicture');
                form.profilePictureUpload =  formData;
                this.uploadSave(form.profilePictureUpload, 'profilePicture');
            } else {
                this.checkUpload[0].profile = true;
            }
            if (form.signatureUpload) {
                formData.append('files', this.formInit.value.signatureUpload.get('files'));
                formData.append('field', 'signature');
                form.signatureUpload =  formData;
                this.uploadSave(form.signatureUpload, 'signature');
            } else {
                this.checkUpload[0].signature = true;
            }
            const uploadFiles = form.filesUpload?.filter((item: any) => item.id === null)
                .map((item: any) => item.filesUploads ? item.filesUploads : 0);
            if (this.formInit.value.filesUpload) {
                if (uploadFiles[0] !== undefined) {
                    form.filesUpload[0].filesUploads.forEach((file: any) => {
                        if (file instanceof File) {
                            formData.append('files', file);
                        } else {
                            console.warn('Archivo no válido:', file);
                        }
                    });

                    formData.append('field', 'files');
                    form.filesUpload =  formData;
                    this.uploadSave(form.filesUpload, 'files');
                }
            } else {
                this.checkUpload[0].files = true;
            }
        }
    }

    async uploadSave(file, type): Promise<void> {
        if (file) {
            const form = this.formInit.value;
            await this.api.uploadService(file).subscribe({
                next: (data: any) => {
                    if (data) {
                        if (type === 'profilePicture') {
                            this.checkUpload[0].profile = true;
                        }
                        if (type === 'signature') {
                            this.checkUpload[0].signature = true;
                        }
                        if (type === 'files') {
                            const filesId = data.files.map((items: any) => items.uid);
                            if (this.id) {
                                this.updateUploadDelete();
                            } else {
                                form.files = filesId;
                            }
                            this.checkUpload[0].files = true;
                        }
                        /*if (this.checkUpload[0].profile && this.checkUpload[0].signature && this.checkUpload[0].files) {
                            this.formSave();
                        }*/
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
                    const vadidDeleteFile = this.filesItems.filter((item: any) => !uploadDelete.includes(item.id));
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

    updateUploadDelete(): void {
        const form = this.formInit.value;
        const validateDeleteItems = this.filesCurrent.filter((item: any) => !this.filesUploadDelete.includes(item));
        form.files = validateDeleteItems;
    }

    async deleteUpload(id: number): Promise<void> {
        await this.api.deleteUploadService(id).subscribe({
            next: (response) => {
                const form = this.formInit.value;
                const uploadFiles = form.filesUpload.filter((item: any) => item.id === null).map((item: any) => item.filesUploads);
                if (uploadFiles[0] !== undefined) {
                } else {
                    this.updateUploadDelete();
                    this.formSave();
                }
            },
            error: (e: any) => console.log(e)
        });
    }

    validateSpecialFields(): void {
        const form = this.formInit.value;
        form.dateAdmission = this.function.validateDate(form.dateAdmission);
        form.birthdate = this.function.validateDate(form.birthdate);
        form.withdrawalDate = this.function.validateDate(form.withdrawalDate);
        form.isManager = this.function.validateBoolean(form.isManager);
        form.fullName = this.function.setNameEmployee(form.firstName, form.secondName, form.firstSurname, form.secondSurname);
        form.eps = this.function.validateSelect(form.eps);
        form.position = this.function.validateSelect(form.position);
        form.arl = this.function.validateSelect(form.arl);
        form.pension = this.function.validateSelect(form.pension);
        form.ccf = this.function.validateSelect(form.ccf);
        form.workspace = this.function.validateSelect(form.workspace);
    }

    async formSave(): Promise<void> {
        this.validateSpecialFields();
        let observable: Observable<Employee>;
        console.log('form ',this.formInit.value);
        if (this.id) {
            observable = await this.api.updateEmployeeService(this.formInit.value, this.id);
        } else {
            observable = await this.api.createEmployeeService(this.formInit.value);
        }
        observable.subscribe({
            next: (item: any) => {
                this.validateFiles(item.uid);
                this.validateSpecialFields();
                /*const toast = this.swaAlert.toast();
                toast.fire({ icon: 'success', title: 'Datos guardados correctamente' }).then((() => {
                    location.href = `/employees/edit/${item.uid}`;
                    this.ngOnInit();
                }));*/
            }, error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

    initForm(): void {
    }
}

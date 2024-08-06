import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { Employee } from 'app/models/employee';
import { ApiService } from 'app/services/api.service';
import { Observable, map } from 'rxjs';
import { ListItemsComponent } from 'app/components/fomsigna/list-items/list-items.component';

import { environment } from 'environments/environment';
import { Users } from 'app/models/users';
import { Functions } from 'app/components/functions/functions';

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
        enabled: new FormControl(true),
        user: new FormControl(),
        isManager: new FormControl(),
        company: new FormControl(1),
        healthcareProvider: new FormControl(''),
        occupationRiskManager: new FormControl(''),
        pension: new FormControl(''),
        compensationFund: new FormControl(''),
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
        username: new FormControl(),
        permissions: new FormControl('ADMIN'),
        roles: new FormControl('TRAINER'),
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
        this.getCities();
        this.getIdentificationTypes();
        this.getHealthcareProvider();
        this.getOccupationRiskManager();
        this.getCompensationFund();
        this.getPension();
        this.getGenders();
        this.getCountries();
        this.getDepartments();
        this.getWorkspace();
        this.getPosition();
        this.getEmployees();
        super.ngOnInit();
        this.getEmployeesId();
        this.nameEmployee = this.formInit.value.names;
        this.date = new Date();
    }

    async getEmployeesId(): Promise<void> {
        if (this.id) {
            await this.api.employeIdService(this.id).subscribe({
                next: (items: any) => {
                    this.setFormEmployees(items.data);
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }

    setFormEmployees(form): void {
        this.formInit.patchValue({
            identificationNumber: form[0]?.identificationNumber ? form[0]?.identificationNumber : '',
            firstName: form[0]?.firstName ? form[0]?.firstName : '',
            secondName: form[0]?.secondName ? form[0]?.secondName : '',
            firstSurname: form[0]?.firstSurname ? form[0]?.firstSurname : '',
            secondSurname: form[0]?.secondSurname ? form[0]?.secondSurname : '',
            birthdate: form[0]?.birthdate ? form[0]?.birthdate : '',
            email: form[0]?.email ? form[0]?.email : '',
            address: form[0]?.address ? form[0]?.address : '',
            cellphoneNumber: form[0]?.cellphoneNumber ? form[0]?.cellphoneNumber : '',
            phoneNumber: form[0]?.phoneNumber ? form[0]?.phoneNumber : '',
            contactName: form[0]?.contactName ? form[0]?.contactName : '',
            contactNumber: form[0]?.contactNumber ? form[0]?.contactNumber : '',
            enabled: form[0]?.enabled ? form[0]?.enabled : '',
            dateAdmission: form[0]?.dateAdmission ? form[0]?.dateAdmission : '',
            withdrawalDate: form[0]?.withdrawalDate ? form[0]?.withdrawalDate : '',
            username: form[0]?.username ? form[0]?.username : '',
            isManager: form[0]?.isManager ? form[0]?.isManager : false,
            profilePicture: form[0]?.profilePicture ? form[0]?.profilePicture.id : null,
            signature: form[0]?.signature ? form[0]?.signature.id : null,
            files: form[0]?.files ? form[0]?.files.map((items: any) => items.id) : null,
            identificationType: form[0]?.identificationType ? form[0]?.identificationType?.id : '',
            position: form[0]?.position?.id ? form[0]?.position.id : '',
            company: form[0]?.company?.id,
            healthcareProvider: form[0]?.healthcareProvider?.id ? form[0]?.healthcareProvider?.id : '',
            pension: form[0]?.pension?.id ? form[0]?.pension?.id : '',
            occupationRiskManager: form[0]?.occupationRiskManager?.id ? form[0]?.occupationRiskManager?.id : '',
            compensationFund: form[0]?.compensationFund?.id ? form[0]?.compensationFund?.id : '',
            workspace: form[0]?.workspace?.id ? form[0]?.workspace?.id : '',
            gender: form[0]?.gender?.id,
            city: form[0]?.city?.id,
            birthCountry: form[0]?.birthCountry?.id,
            user: form[0]?.user.id ? form[0]?.user.id : null
        });
        this.imageProfile = form[0]?.profilePicture ? this.urlImage(form[0]?.profilePicture.url) : null;
        if (this.imageProfile) {
            this.uploadProfile = false;
        }
        this.imageSignature = form[0]?.signature ? this.urlImage(form[0]?.signature.formats.thumbnail.url) : null;
        this.filesItems = form[0]?.files ? form[0]?.files : '';
        this.filesCurrent = form[0]?.files ? form[0]?.files.map((items: any) => items.id) : [];
        this.usernameValidate = form[0]?.username ? form[0]?.username : '';
    }

    urlImage(url: any): string {
        return environment.urlApp + url;
    }


    createUsername($event, type): void {
        const form = this.formInit.value;
        form.firstName = type === 'fn' ? $event.target.value : form.firstName;
        form.firstSurname = type === 'pa' ? $event.target.value : form.firstSurname;
        form.secondSurname = type === 'sa' ? $event.target.value : form.secondSurname;
        const user = `${form.firstName.slice(0, 2)}${form.firstSurname}${form.secondSurname.slice(0, 1)}`;
        this.formInit.patchValue({ username: user ? user.toLowerCase() : '' });
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

    async validateExistingUser(): Promise<void> {
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
    }

    onSubmit(): void {
        const form = this.formInit.value;
        if (this.formInit.invalid) {
            this.validate = true;
            return;
        }
        this.validateExistingUser();
    }


    async validateUser(): Promise<void> {
        const form = this.formInit.value;
        const user: any = { username: this.formInit.value.username, email: this.formInit.value.email, password: '', role: 3 };
        const userUpdate: any = { username: this.formInit.value.username, email: this.formInit.value.email };
        user.username = form.username;
        user.email = form.email;
        user.password = form.identificationNumber;
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


    validateFiles(): any {
        this.validDeleFile();
        const form = this.formInit.value;
        //if (this.formInit.value.filesUpload !== undefined && this.formInit.value.filesUpload !== null) {

        if (!form.profilePictureUpload && !form.signatureUpload && !form.filesUpload) {
            this.formSave();
        } else {
            if (form.profilePictureUpload) {
                this.uploadSave(form.profilePictureUpload, 'profilePicture');
            } else {
                this.checkUpload[0].profile = true;
            }
            if (form.signatureUpload) {
                this.uploadSave(form.signatureUpload, 'signature');
            } else {
                this.checkUpload[0].signature = true;
            }
            const uploadFiles = form.filesUpload?.filter((item: any) => item.id === null)
                .map((item: any) => item.filesUploads ? item.filesUploads : 0);
            if (this.formInit.value.filesUpload) {
                if (uploadFiles[0] !== undefined) {
                    this.uploadSave(uploadFiles[0], 'files');
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
                            form.profilePicture = data[0].id;
                            this.checkUpload[0].profile = true;
                        }
                        if (type === 'signature') {
                            form.signature = data[0].id;
                            this.checkUpload[0].signature = true;
                        }
                        if (type === 'files') {
                            const filesId = data.map((items: any) => items.id);
                            if (this.id) {
                                filesId.forEach((id: any) => this.filesCurrent.push(id));
                                this.updateUploadDelete();
                            } else {
                                form.files = filesId;
                            }
                            this.checkUpload[0].files = true;
                        }
                        if (this.checkUpload[0].profile && this.checkUpload[0].signature && this.checkUpload[0].files) {
                            this.formSave();
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
        form.healthcareProvider = this.function.validateSelect(form.healthcareProvider);
        form.position = this.function.validateSelect(form.position);
        form.occupationRiskManager = this.function.validateSelect(form.occupationRiskManager);
        form.pension = this.function.validateSelect(form.pension);
        form.compensationFund = this.function.validateSelect(form.compensationFund);
        form.workspace = this.function.validateSelect(form.workspace);
    }


    async formSave(): Promise<void> {
        this.validateSpecialFields();
        let observable: Observable<Employee>;
        if (this.id) {
            observable = await this.api.updateEmployeeService(this.formInit.value, this.id);
        } else {
            observable = await this.api.createEmployeeService(this.formInit.value);
        }
        observable.subscribe({
            next: (item: any) => {
                //const route = `/employees/edit/${item.data.id}`;
                //this.router.navigateByUrl(route);
                const toast = this.swaAlert.toast();
                toast.fire({ icon: 'success', title: 'Datos guardados correctamente' }).then((() => {
                    //this.getEmployeesId();
                    location.href = `/employees/edit/${item.data.id}`;
                    this.ngOnInit();
                }));
            }, error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

    initForm(): void {
    }
}

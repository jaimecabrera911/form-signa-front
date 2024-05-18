import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { Employee } from 'app/models/employee';
import { ApiService } from 'app/services/api.service';
import { Observable, map } from 'rxjs';
import { ListItemsComponent } from 'app/components/fomsigna/list-items/list-items.component';
import { MatDialog } from '@angular/material/dialog';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends ListItemsComponent implements OnInit {
    colums: any = [];
    override apiItems$ = this.api.documentsUserService();

    title = new Path().getModule();
    subtitle = 'Adicionar de empleados';
    searchPanel = false;
    id: any = 0;
    swaAlert = new SwalAlert();
    nameEmployee: string = '';
    elementsUpload: any = [];
    uploadFiles: boolean = false;
    listFiles: boolean = true;
    imageProfile: any = '';
    imageSignature: any = '';
    filesItems: any[] = [];
    filesCurrent: string[] = [];
    uploadProfile: boolean = true;
    showImage: boolean = true;
    validate: boolean = false;
    checkUpload: any[] = [{profile: false, signature: false, files: false}];
    date: any;
//[Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]
//, [Validators.required, Validators.pattern('^[0-9]*$'), Validators.minLength(10), Validators.maxLength(10)]
    formInit: any = this._formBuilder.group({
        identificationType: new FormControl(),
        identificationNumber: new FormControl(),
        names: new FormControl(),
        surnames: new FormControl(),
        birthdate: new FormControl(),
        email: new FormControl(''),
        address: new FormControl(),
        cellphoneNumber: new FormControl(''),
        phoneNumber: new FormControl(''),
        password: new FormControl(''),
        position: new FormControl(),
        contactName: new FormControl(''),
        contactNumber: new FormControl(''),
        enabled: new FormControl(true),
        user: new FormControl(1),
        company: new FormControl(1),
        healthcareProvider: new FormControl(),
        occupationRiskManager: new FormControl(),
        pension: new FormControl(),
        compensationFund: new FormControl(),
        workspace: new FormControl(),
        gender: new FormControl('', [Validators.required]),
        city: new FormControl(),
        birthCountry: new FormControl(1),
        profilePicture: new FormControl(),
        dateAdmission: new FormControl(''),
        withdrawalDate: new FormControl(''),
        signature: new FormControl(),
        signatureUpload: new FormControl(null),
        profilePictureUpload: new FormControl(null),
        files: new FormControl(),
        filesUpload: new FormControl(null),
        showUpload: new FormControl(false)
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
        super.ngOnInit();
        this.getEmployeesId();
        this.nameEmployee = this.formInit.value.names;
        this.date = new Date();
    }

    getEmployeesId(): void {
        if (this.id) {
            this.api.employeIdService(this.id).subscribe({
                next: (items: any) => {
                    this.setFormEmployees(items.data);
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }


    setFormEmployees(form): void {
        this.formInit.patchValue({
            identificationNumber: form[0]?.identificationNumber,
            names: form[0]?.names ? form[0]?.names : '',
            surnames: form[0]?.surnames ? form[0]?.surnames : '',
            birthdate: form[0]?.birthdate ? form[0]?.birthdate : '',
            email: form[0]?.email ? form[0]?.email : '',
            address: form[0]?.address ? form[0]?.address : '',
            cellphoneNumber: form[0]?.cellphoneNumber ? form[0]?.cellphoneNumber : '',
            phoneNumber: form[0]?.phoneNumber ? form[0]?.phoneNumber : '',
            contactName: form[0]?.contactName ? form[0]?.contactName : '',
            contactNumber: form[0]?.contactNumber ? form[0]?.contactNumber : '',
            enabled: form[0]?.enabled ? form[0]?.enabled : '',
            profilePicture: form[0].profilePicture ? form[0]?.profilePicture.id : null,
            signature: form[0].signature ? form[0]?.signature.id : null,
            files: form[0]?.files ? form[0]?.files.map((items: any) => items.id) : null,
            identificationType: form[0]?.identificationType ? form[0]?.identificationType.id : '',
            position: form[0]?.position.id,
            company: form[0]?.company.id,
            healthcareProvider: form[0]?.healthcareProvider.id,
            pension: form[0]?.pension.id,
            occupationRiskManager: form[0]?.occupationRiskManager.id,
            compensationFund: form[0]?.compensationFund.id,
            workspace: form[0]?.workspace.id,
            gender: form[0]?.gender.id,
            city: form[0]?.city.id,
            birthCountry: form[0]?.birthCountry.id,
            user: form[0]?.user.id
        });
        this.imageProfile = form[0].profilePicture ?  this.urlImage(form[0]?.profilePicture.formats.thumbnail.url)  : null;
        if (this.imageProfile) {
            this.uploadProfile = false;
        }
        this.imageSignature = form[0].signature ? this.urlImage(form[0]?.signature.formats.thumbnail.url) : null;
        this.filesItems = form[0]?.files ? form[0]?.files : '';
        this.filesCurrent = form[0]?.files ? form[0].files.map((items: any) => items.id) : [];
        console.log('filesCurrent:: ',this.filesCurrent);
    }

    urlImage(url: any): string{
         return environment.urlApp+url;
    }

    uploadFile(item): void {
        if (item === 'UPLOAD_FILES_SHOW') {
            this.uploadFiles = true;
            //this.listFiles = false;
        }

        if(item === 'UPLOAD_FILES_HID') {
            this.uploadFiles = false;
            //this.listFiles = true;
        }
    }

    validateFilesUpload(data: any): any {
        const filesId = data.map((items: any) => items.id);
        if(this.id){
            filesId.forEach((num: any) => this.filesCurrent.push(num));
            const items = this.filesCurrent;
        }else{
            const items = filesId.forEach((num: any) => this.filesCurrent.push(num));
        }
    }

    onSubmit(): void {
        const form = this.formInit.value;
        console.log('form', form);
        if (this.formInit.invalid) {
            this.validate = true;
            console.log('valid form temp', this.validate);
            return;
        }
        this.validateFiles();
    }



    validateFiles(): any {
        const form = this.formInit.value;
        if (form.profilePictureUpload) {
            this.uploadSave(form.profilePictureUpload, 'profilePicture');
        }else{
            this.checkUpload[0].profile = true;
        }

        if (form.signatureUpload) {
            this.uploadSave(form.signatureUpload, 'signature');
        }else{
            this.checkUpload[0].signature = true;
        }

        if (form.filesUpload) {
            this.uploadSave(form.filesUpload, 'files');
        }else{
            this.checkUpload[0].files = true;
        }

        /*if(this.checkUpload[0].profile && this.checkUpload[0].signature &&  this.checkUpload[0].files){
            this.formSave();
        }*/
    }

    uploadSave(file, type): void {

        if (file) {
            const form = this.formInit.value;
            this.api.uploadService(file).subscribe({
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
                            if(this.id){
                                filesId.forEach((id: any) => this.filesCurrent.push(id));
                                form.files = this.filesCurrent;
                            }else{
                                form.files = filesId;
                            }
                            this.checkUpload[0].files = true;
                        }
                        if(this.checkUpload[0].profile && this.checkUpload[0].signature &&  this.checkUpload[0].files){
                            console.log('check: ',this.checkUpload);
                            console.log(' form  vvva', form);
                            console.log('aprobado ');
                            this.formSave();
                        }

                    }
                }, error: (e: any) => this.swaAlert.toastErrorUpload()
            });
        }
    }

    formSave(): void {
        let observable: Observable<Employee>;
        if (this.id) {
            observable = this.api.updateEmployeeService(this.formInit.value,this.id);
        } else {
            observable = this.api.createEmployeeService(this.formInit.value);
        }
        observable.subscribe({
            next: (item: any) => {
                const route = `/employees/edit/${item.data.id}`;
                this.router.navigateByUrl(route);
                const toast = this.swaAlert.toast();
                toast.fire({ icon: 'success', title: 'Datos guardados correctamente' }).then((() => {}));
            },error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

    initForm(): void {
    }
}

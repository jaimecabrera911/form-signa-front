import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { Employee } from 'app/models/employee';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';
import { ListItemsComponent } from 'app/components/fomsigna/list-items/list-items.component';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { FileUpload } from 'app/components/upload/file-upload';
import { ListComponent } from 'app/components/list/list-component';

export const items = [
    {
        id         : 'cd6897cb-acfd-4016-8b53-3f66a5b5fc68',
        folderId   : null,
        name       : 'Personal',
        createdBy  : 'Brian Hughes',
        createdAt  : 'April 24, 2018',
        modifiedAt : 'April 24, 2018',
        size       : '87 MB',
        type       : 'folder',
        contents   : '57 files',
        description: 'Personal documents such as insurance policies, tax papers and etc.'
    },
    {
        id         : '6da8747f-b474-4c9a-9eba-5ef212285500',
        folderId   : null,
        name       : 'Photos',
        createdBy  : 'Brian Hughes',
        createdAt  : 'November 01, 2021',
        modifiedAt : 'November 01, 2021',
        size       : '3015 MB',
        type       : 'folder',
        contents   : '907 files',
        description: 'Personal photos; selfies, family, vacation and etc.'
    },
    {
        id         : 'ed58add1-45a7-41db-887d-3ca7ee7f2719',
        folderId   : null,
        name       : 'Work',
        createdBy  : 'Brian Hughes',
        createdAt  : 'May 8, 2020',
        modifiedAt : 'May 8, 2020',
        size       : '14 MB',
        type       : 'folder',
        contents   : '24 files',
        description: 'Work related files, mainly documents and paychecks.'
    },
    {
        id         : '5cb66e32-d1ac-4b9a-8c34-5991ce25add2',
        folderId   : null,
        name       : 'Contract #123',
        createdBy  : 'Brian Hughes',
        createdAt  : 'January 14, 2021',
        modifiedAt : 'January 14, 2021',
        size       : '1.2 MB',
        type       : 'PDF',
        contents   : null,
        description: null
    },
    {
        id         : '3ffc3d84-8f2d-4929-903a-ef6fc21657a7',
        folderId   : null,
        name       : 'Estimated budget',
        createdBy  : 'Brian Hughes',
        createdAt  : 'December 14, 2020',
        modifiedAt : 'December 14, 2020',
        size       : '679 KB',
        type       : 'XLS',
        contents   : null,
        description: null
    },
    {
        id         : '157adb9a-14f8-4559-ac93-8be893c9f80a',
        folderId   : null,
        name       : 'DMCA notice #42',
        createdBy  : 'Brian Hughes',
        createdAt  : 'May 8, 2021',
        modifiedAt : 'May 8, 2021',
        size       : '1.5 MB',
        type       : 'DOC',
        contents   : null,
        description: null
    },
    {
        id         : '4f64597a-df7e-461c-ad60-f33e5f7e0747',
        folderId   : null,
        name       : 'Invoices',
        createdBy  : 'Brian Hughes',
        createdAt  : 'January 12, 2020',
        modifiedAt : 'January 12, 2020',
        size       : '17.8 MB',
        type       : 'PDF',
        contents   : null,
        description: null
    },
    {
        id         : 'e445c445-57b2-4476-8c62-b068e3774b8e',
        folderId   : null,
        name       : 'Crash logs',
        createdBy  : 'Brian Hughes',
        createdAt  : 'June 8, 2020',
        modifiedAt : 'June 8, 2020',
        size       : '11.3 MB',
        type       : 'TXT',
        contents   : null,
        description: null
    },
    {
        id         : 'b482f93e-7847-4614-ad48-b78b78309f81',
        folderId   : null,
        name       : 'System logs',
        createdBy  : 'Brian Hughes',
        createdAt  : 'June 8, 2020',
        modifiedAt : 'June 8, 2020',
        size       : '9.3 MB',
        type       : 'TXT',
        contents   : null,
        description: null
    },
    {
        id         : 'ec07a98d-2e5b-422c-a9b2-b5d1c0e263f5',
        folderId   : null,
        name       : 'Personal projects',
        createdBy  : 'Brian Hughes',
        createdAt  : 'March 18, 2020',
        modifiedAt : 'March 18, 2020',
        size       : '4.3 MB',
        type       : 'DOC',
        contents   : null,
        description: null
    },
    {
        id         : 'ae908d59-07da-4dd8-aba0-124e50289295',
        folderId   : null,
        name       : 'Biometric portrait',
        createdBy  : 'Brian Hughes',
        createdAt  : 'August 29, 2020',
        modifiedAt : 'August 29, 2020',
        size       : '4.5 MB',
        type       : 'JPG',
        contents   : null,
        description: null
    },
    {
        id         : '4038a5b6-5b1a-432d-907c-e037aeb817a8',
        folderId   : null,
        name       : 'Scanned image 20201012-1',
        createdBy  : 'Brian Hughes',
        createdAt  : 'September 13, 2020',
        modifiedAt : 'September 13, 2020',
        size       : '7.8 MB',
        type       : 'JPG',
        contents   : null,
        description: null
    },
    {
        id         : '630d2e9a-d110-47a0-ac03-256073a0f56d',
        folderId   : null,
        name       : 'Scanned image 20201012-2',
        createdBy  : 'Brian Hughes',
        createdAt  : 'September 14, 2020',
        modifiedAt : 'September 14, 2020',
        size       : '7.4 MB',
        type       : 'JPG',
        contents   : null,
        description: null
    },
    {
        id         : '1417d5ed-b616-4cff-bfab-286677b69d79',
        folderId   : null,
        name       : 'Prices',
        createdBy  : 'Brian Hughes',
        createdAt  : 'April 07, 2020',
        modifiedAt : 'April 07, 2020',
        size       : '2.6 MB',
        type       : 'DOC',
        contents   : null,
        description: null
    },
    {
        id         : 'bd2817c7-6751-40dc-b252-b6b5634c0689',
        folderId   : null,
        name       : 'Shopping list',
        createdBy  : 'Brian Hughes',
        createdAt  : 'March 26, 2021',
        modifiedAt : 'March 26, 2021',
        size       : '2.1 MB',
        type       : 'DOC',
        contents   : null,
        description: null
    },
    {
        id         : '14fb47c9-6eeb-4070-919c-07c8133285d1',
        folderId   : null,
        name       : 'Summer budget',
        createdBy  : 'Brian Hughes',
        createdAt  : 'June 02, 2020',
        modifiedAt : 'June 02, 2020',
        size       : '943 KB',
        type       : 'XLS',
        contents   : null,
        description: null
    },

    {
        id         : '894e8514-03d3-4f5e-bb28-f6c092501fae',
        folderId   : 'cd6897cb-acfd-4016-8b53-3f66a5b5fc68',
        name       : 'A personal file',
        createdBy  : 'Brian Hughes',
        createdAt  : 'June 02, 2020',
        modifiedAt : 'June 02, 2020',
        size       : '943 KB',
        type       : 'XLS',
        contents   : null,
        description: null
    },
    {
        id         : '74010810-16cf-441d-a1aa-c9fb620fceea',
        folderId   : 'cd6897cb-acfd-4016-8b53-3f66a5b5fc68',
        name       : 'A personal folder',
        createdBy  : 'Brian Hughes',
        createdAt  : 'November 01, 2021',
        modifiedAt : 'November 01, 2021',
        size       : '3015 MB',
        type       : 'folder',
        contents   : '907 files',
        description: 'Personal photos; selfies, family, vacation and etc.'
    },
    {
        id         : 'a8c73e5a-8114-436d-ab54-d900b50b3762',
        folderId   : '74010810-16cf-441d-a1aa-c9fb620fceea',
        name       : 'A personal file within the personal folder',
        createdBy  : 'Brian Hughes',
        createdAt  : 'June 02, 2020',
        modifiedAt : 'June 02, 2020',
        size       : '943 KB',
        type       : 'XLS',
        contents   : null,
        description: null
    },

    {
        id         : '12d851a8-4f60-473e-8a59-abe4b422ea99',
        folderId   : '6da8747f-b474-4c9a-9eba-5ef212285500',
        name       : 'Photos file',
        createdBy  : 'Brian Hughes',
        createdAt  : 'June 02, 2020',
        modifiedAt : 'June 02, 2020',
        size       : '943 KB',
        type       : 'XLS',
        contents   : null,
        description: null
    },
    {
        id         : '2836766d-27e1-4f40-a31a-5a8419105e7e',
        folderId   : 'ed58add1-45a7-41db-887d-3ca7ee7f2719',
        name       : 'Work file',
        createdBy  : 'Brian Hughes',
        createdAt  : 'June 02, 2020',
        modifiedAt : 'June 02, 2020',
        size       : '943 KB',
        type       : 'XLS',
        contents   : null,
        description: null
    }
];
@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends ListItemsComponent implements OnInit {
    colums: any = [];
    public override apiItems$ = this.api.documentsUserService();

    title = new Path().getModule();
    subtitle = 'Adicionar de empleados';
    searchPanel = false;
    id: string | number | null = 0;
    swaAlert = new SwalAlert();
    fileUpload = new FileUpload();
    files: File[] = [];
    //items: any = items;

    genders: any[] = [
        { name: 'Masculino', code: 'M' },
        { name: 'Femenino', code: 'F' },
        { name: 'Otro', code: 'O' },
    ];

    others: any[] = [
        { code: '1', name: 'opcion 1' },
        { code: '2', name: 'opcion 2' },
        { code: '3', name: 'opcion 3' },
        { code: '4', name: 'opcion 4' }
    ];

    itemss = [
        { id: 'read-users', name: 'Lectura' },
        { id: 'write-users', name: 'escritura' },
        { id: 'delete-users', name: 'Eliminar' }
    ];


    formInit: any = this._formBuilder.group({
        identificationType: new FormControl('CC'),
        identificationNumber: new FormControl('5345345346'),
        names: new FormControl('Miguel Angel 1111'),
        surnames: new FormControl('Espejo Castellanos 111'),
        phoneNumber: new FormControl('7555555'),
        cellphoneNumber: new FormControl('3123371764', [Validators.required,
        Validators.pattern('^[0-9]*$'),
        Validators.minLength(10), Validators.maxLength(10)]),
        email: new FormControl('miguel_1111@gmail.com', [Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]),
        position: new FormControl('Desarrollador Software'),
        workspace: new FormControl('TI'),
        roleName: new FormControl('EMPLOYEE'),
        companyUuid: new FormControl('f5995673-825e-41ee-a886-6af332817eef',),
        gender: new FormControl('M', [Validators.required]),
        birthCountry: new FormControl('169'),
        city: new FormControl('11001'),
        department: new FormControl(''),
        address: new FormControl('CR 27 C 70 81'),
        password: new FormControl('123456789'),
        birthdate: new FormControl(''),
        eps: new FormControl(''),
        arl: new FormControl(''),
        pensionFund: new FormControl(''),
        compensationBox: new FormControl(''),
        emergencyContact: new FormControl(''),
        telephoneNumberEmergencyContact: new FormControl(''),
        profilePicture: new FormControl('http://drive.com/image.png'),
        permissions: new FormControl([]),
        sign: new FormControl('')
    });

   /* formInitFirma: any = this._formBuilder.group({
        sign: new FormControl('')
    });*/

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        protected api: ApiService
    ) {
        super(api);
    }

    override ngOnInit(): void {
        super.ngOnInit();
        this.id = this.activatedRouter.snapshot?.paramMap.get('id');
    }

    onRemove(event): void {
        this.fileUpload.onRemove(event, this.files);
    }

    onSelect(event): void {
        this.fileUpload.onSelect(event, this.files);
        //this.uploadImage();
    }

    onSubmit(): void {
        const data = this.formInit.value;
        console.log('form: ', data);
        //this.formSave();
    }

    formSave(): void {
        let observable: Observable<Employee>;
        if (this.id) {
            //observable = this.api.createEmployeeService(this.pageId, this.formInit.value);
        } else {
            observable = this.api.createEmployeeService(this.formInit.value);
        }
        observable.subscribe({
            next: (data: any) => {
                this.router.navigateByUrl('/employees');
                //this.router.navigateByUrl(`/employee/pages/${success.id}/edit`);
                const toast = this.swaAlert.Toast();
                toast.fire({ icon: 'success', title: 'Datos guardados correctamente' })
                    .then((() => {
                    }));
            },
            error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }


    initForm(): void {
    }
}

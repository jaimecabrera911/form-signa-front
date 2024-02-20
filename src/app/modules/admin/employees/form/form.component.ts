import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { Employee } from 'app/models/employee';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';
import { ListItemsComponent } from 'app/components/fomsigna/list-items/list-items.component';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends ListItemsComponent implements OnInit {

    title = new Path().getModule();
    //typeIdentifications = new ListComponent();
    subtitle = 'Registro de proveedores';
    id: string | number | null = 0;
    swaAlert = new SwalAlert();

    typeDocuments: any[] = [
        { value: 'Cedula ciudadania', viewValue: 'CC' },
        { value: 'Tarjeta Identidad', viewValue: 'TI' },
        { value: 'Pasaporte', viewValue: 'PA' },
        { value: 'Cédula de Extranjería', viewValue: 'CE' },
        { value: 'Registro Civil', viewValue: 'RC' },
        { value: 'Carné Diplomático', viewValue: 'CD' },
    ];

    genders: any[] = [
        { value: 'M', viewValue: 'Masculino' },
        { value: 'F', viewValue: 'Femenino' },
        { value: 'O', viewValue: 'Otro' },
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
        address: new FormControl('CR 27 C 70 81'),
        password: new FormControl('123456789'),
        birthdate: new FormControl('1988-02-11'),
        profilePicture: new FormControl('http://drive.com/image.png'),
        permissions: this._formBuilder.array(
            ['write-users',
             'read-users',
                'delete-users'])
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
        super.ngOnInit();
        this.id = this.activatedRouter.snapshot?.paramMap.get('id');
    }

    onSubmit(): void {
        console.log('form: ', this.formInit.value);
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

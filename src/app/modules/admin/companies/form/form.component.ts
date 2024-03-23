import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { Company } from 'app/models/company';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    title = new Path().getModule();
    subtitle = 'Registro de empresas';
    id: string | number | null = 0;
    searchPanel = false;
    swaAlert = new SwalAlert();

    regimen: any[] = [
        { code: 'comun', name: 'Común' },
        { code: 'simplificado', name: 'Simplificado' }
    ];

    formInit: any = this._formBuilder.group({
        identificationType: new FormControl('NIT'),
        identificationNumber: new FormControl('2222'),
        representateLegal: new FormControl('rep legal'),
        regimen: new FormControl('2222'),
        name: new FormControl('Empresa 1'),
        email: new FormControl('empresa1@gmail.com'),
        website: new FormControl('www.empresa1.com'),
        phone: new FormControl('11111111'),
        address: new FormControl('direccion 1'),
        department: new FormControl('ANTIOQUIA'),
        city: new FormControl('05001')
    });

    constructor(
        private _formBuilder: FormBuilder,
        private router: Router,
        private activatedRouter: ActivatedRoute,
        protected api: ApiService
    ) {

    }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const data = this.formInit.value;
        console.log('form: ', data);
        this.formSave();
    }

    formSave(): void {
        let observable: Observable<Company>;
        if (this.id) {
            //observable = this.api.createEmployeeService(this.pageId, this.formInit.value);
        } else {
            observable = this.api.createCompanyService(this.formInit.value);
        }
        observable.subscribe({
            next: (data: any) => {
                this.router.navigateByUrl('/companies');
                //this.router.navigateByUrl(`/employee/pages/${success.id}/edit`);
                const toast = this.swaAlert.Toast();
                toast.fire({ icon: 'success', title: 'Datos guardados correctamente' })
                    .then((() => {
                    }));
            },
            error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

}

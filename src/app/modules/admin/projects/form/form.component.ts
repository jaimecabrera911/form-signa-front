import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Path } from 'app/components/routers/path';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

    title = new Path().getModule();
    subtitle = 'Registro de proveedores';
    id: string | number | null = 0;
    searchPanel: boolean = false;
    swaAlert = new SwalAlert();

    formInit: any = this._formBuilder.group({
        code: new FormControl('P004'),
        name: new FormControl('Proyect'),
        description: new FormControl('description'),
        cityCode: new FormControl(''),
        startDate: new FormControl(''),
        endDate: new FormControl(''),
        assigned: new FormControl(''),
        stade: new FormControl(''),
        companyUuid: new FormControl('01b2e626-9fe7-4e0a-a191-c203c6733d1')
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
        let observable: Observable<any>;
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

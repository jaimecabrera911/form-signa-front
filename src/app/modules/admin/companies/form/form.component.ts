import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListItemsComponent } from 'app/components/formasigna/list-items/list-items.component';

import { Path } from 'app/components/routers/path';
import { Company } from 'app/models/company';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends ListItemsComponent implements OnInit {

    colums: any = [];
    title = new Path().getModule();
    subtitle = 'Registro de empresas';
    id: any = 0;
    searchPanel = false;
    swaAlert = new SwalAlert();
    validate: boolean = false;
    modView: boolean = true;

    formInit: any = this._formBuilder.group({
        logo: new FormControl('https://www.acmecorp.com/logo.png'),
        identificationType: new FormControl('NIT', [Validators.required]),
        identificationNumber: new FormControl('', [Validators.required]),
        legalRepresentative: new FormControl('', [Validators.required]),
        regime: new FormControl('', [Validators.required]),
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required]),
        webSite: new FormControl(),
        phone: new FormControl('', [Validators.required]),
        address: new FormControl(),
        city: new FormControl()
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
        this.getCompanyId();
        this.getCities(11);
        this.getLabels();
        this.getRegimes();
    }

    getCompanyId(): void {
        if (this.id) {
            this.api.companyIdService(this.id).subscribe({
                next: (items: any) => {
                   this.setFormCompanies(items);
                   this.getView();
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }

    setFormCompanies(form): void {
        this.formInit.patchValue({
            identificationNumber: form?.identificationNumber,
            name: form?.name,
            legalRepresentative: form?.legalRepresentative,
            email: form?.email,
            webSite: form?.webSite,
            phone: form?.phone,
            address: form?.address,
            regime: form?.regime?.code,
            city: form?.city?.code,
            employees: form?.employees?.id,
            workspaces: form?.workspaces?.id
        });
    }

    getView(): void {
        const route = window.location.pathname;
        const type = route.split('/');
        if (type[2] === 'view') {
            this.formInit.disable();
            this.modView = false;
        }
    }

    filterParamLabel(code: any): any {
        const param = this.paramLabels?.filter((item: any) => item.code === code)
            .map((item: any) => item.name ? item.name : '');
        return param ? param[0] : '';
    }

    onSubmit(): void {
        if (this.formInit.invalid) {
            this.validate = true;
            return;
        }
        this.formSave();
    }

    formSave(): void {
        let observable: Observable<Company>;
        if (this.id) {
            observable = this.api.updateCompanyService(this.formInit.value,this.id);
        } else {
            observable = this.api.createCompanyService(this.formInit.value);
        }
        observable.subscribe({
            next: (item: any) => {
                const route = `/companies/edit/${item.uid}`;
                this.router.navigateByUrl(route);
                const toast = this.swaAlert.toast();
                toast.fire({ icon: 'success', title: 'Datos guardados correctamente' })
                    .then((() => {}));
            },
            error: (e: any) => this.swaAlert.toastErrorUpdate()
        });
    }

    initForm(): void {
    }

}

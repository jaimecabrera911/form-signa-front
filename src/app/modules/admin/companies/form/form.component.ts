import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListItemsComponent } from 'app/components/fomsigna/list-items/list-items.component';
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
    //public override apiItems$ = '';
    title = new Path().getModule();
    subtitle = 'Registro de empresas';
    id: any = 0;
    searchPanel = false;
    swaAlert = new SwalAlert();
    validate: boolean = false;

    formInit: any = this._formBuilder.group({
        identificationType: new FormControl(),
        identificationNumber: new FormControl(),
        legalRepresentative: new FormControl(),
        regime: new FormControl(''),
        name: new FormControl(),
        email: new FormControl(),
        webSite: new FormControl(),
        phone: new FormControl(),
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
    }

    getCompanyId(): void {
        if (this.id) {
            this.api.companyIdService(this.id).subscribe({
                next: (items: any) => {
                   this.setFormCompanies(items.data);
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }

    setFormCompanies(form): void {
        this.formInit.patchValue({
            identificationNumber: form[0].identificationNumber,
            name: form[0].name,
            legalRepresentative: form[0].legalRepresentative,
            email: form[0].email,
            webSite: form[0].webSite,
            phone: form[0].phone,
            address: form[0].address,
            regime: form[0].regime.id,
            city: form[0].city.id,
            employees: form[0].employees.id,
            workspaces: form[0].workspaces.id
        });
    }

    onSubmit(): void {
        const data = this.formInit.value;
        if (this.formInit.invalid) {
            this.validate = true;
            //console.log('valid form temp', this.validate);
            return;
        }
        console.log('form: ', data);
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
                const route = `/companies/edit/${item.data.id}`;
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

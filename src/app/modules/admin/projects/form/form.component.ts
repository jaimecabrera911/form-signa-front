import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListItemsComponent } from 'app/components/formasigna/list-items/list-items.component';
import { Path } from 'app/components/routers/path';
import { TableItems } from 'app/models/table/table-items';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.scss']
})
export class FormComponent extends ListItemsComponent implements OnInit {

    title = new Path().getModule();
    colums: any = [];
    subtitle = 'Registro de proveedores';
    id: any = 0;
    searchPanel: boolean = false;
    swaAlert = new SwalAlert();
    validate: boolean = false;
    modView: boolean = true;

    iterableColumns: TableItems[] = [
        { name: 'code', name2: false, styleEnable: false, label: 'Formulario' },
        { name: 'name', name2: false, styleEnable: false, label: 'Descripción' },
        { name: 'createdAt', name2: false, formatDate: true, styleEnable: false, label: 'Fecha recibido' },
        { name: 'id', name2: 'code', styleEnable: false, label: 'Editar', edit: true, editModule: 'forms-project' }
    ];

    formInit: any = this._formBuilder.group({
        code: new FormControl(),
        name: new FormControl('', [Validators.required]),
        description: new FormControl(),
        startDate: new FormControl(),
        endDate: new FormControl(),
        company: new FormControl(),
        responsible: new FormControl(),
        status: new FormControl('pending')
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
        this.getProjectId();
        this.getStateProject();
        this.getEmployees();
        this.getLabels();
        this.getFormId();
        this.getCompanies();
    }

    getProjectId(): void {
        if (this.id) {
            this.api.projectIdService(this.id).subscribe({
                next: (items: any) => {
                   this.setFormProjects(items);
                   this.getView();
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
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
        return param.length >= 1 ? param[0] : '';
    }

    getFormId(): void {
        /*if (this.id) {
            this.apiItems$ = this.api.formsIdProjectService(this.id);
        }*/
    }

    setFormProjects(form): void {
        this.formInit.patchValue({
            code: form?.code,
            name: form?.name,
            description: form?.description,
            startDate: form?.startDate,
            endDate: form?.endDate,
            company: form?.company?.uid,
            responsible: form?.responsible?.email,
            state: form?.state?.id
        });
    }

    onSubmit(): void {
        if (this.formInit.invalid) {
            this.validate = true;
            return;
        }
        const data = this.formInit.value;
        this.formSave();
    }

    formSave(): void {
        let observable: Observable<any>;
        if (this.id) {
            observable = this.api.updateProjectService(this.formInit.value,this.id);
        } else {
            observable = this.api.createProjectService(this.formInit.value);
        }
        observable.subscribe({
            next: (item: any) => {
                const route = `/projects/edit/${item.uid}`;
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

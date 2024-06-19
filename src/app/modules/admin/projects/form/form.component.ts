import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { ListItemsComponent } from 'app/components/fomsigna/list-items/list-items.component';
import { Path } from 'app/components/routers/path';
import { ApiService } from 'app/services/api.service';
import { Observable } from 'rxjs';

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

    formInit: any = this._formBuilder.group({
        code: new FormControl(),
        name: new FormControl('', [Validators.required]),
        description: new FormControl(),
        city: new FormControl(),
        startDate: new FormControl(),
        endDate: new FormControl(),
        company: new FormControl(1),
        user: new FormControl(1),
        state: new FormControl('')
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
        this.getCities();
        this.getStateProject();
        this.getEmployees();
    }

    getProjectId(): void {
        if (this.id) {
            this.api.projectIdService(this.id).subscribe({
                next: (items: any) => {
                   this.setFormProjects(items.data);
                }, error: (e: any) => this.swaAlert.toastErrorUpdate()
            });
        }
    }

    setFormProjects(form): void {
        this.formInit.patchValue({
            code: form[0].code,
            name: form[0].name,
            description: form[0].description,
            startDate: form[0].startDate,
            endDate: form[0].endDate,
            city: form[0].city.id,
            company: form[0].company.id,
            user: form[0].user.id,
            state: form[0].state.id
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
                const route = `/projects/edit/${item.data.id}`;
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

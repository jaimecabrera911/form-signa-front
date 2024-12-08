import { AfterContentChecked, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SwalAlert } from 'app/components/alerts/swalAlert';
import { Functions } from 'app/components/functions/functions';
import { ApiService } from 'app/services/api.service';
import { environment } from 'environments/environment';

@Component({
    selector: 'app-signature-assitant',
    templateUrl: './signature-assitant.component.html',
    styleUrls: ['./signature-assitant.component.scss']
})
export class SignatureAssitantComponent implements OnInit {

    items: any = [];
    fullName: string = '';
    idAssitant: number;
    imageSignature: string = '';
    swaAlert = new SwalAlert();
    function: any = new Functions();
    someProperty: boolean = false;

    formInit: any = this._formBuilder.group({
        isSigned: new FormControl(true),
        signature: new FormControl('', [Validators.required]),
        signatureUpload: new FormControl('')
    });

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _formBuilder: FormBuilder,
        protected api: ApiService,
        //private _unsubscribeAll: Subject<any> = new Subject<any>();
        private cdref: ChangeDetectorRef,
        public dialogRef: MatDialogRef<SignatureAssitantComponent>
    ) {
    }

    ngOnInit(): void {
        //this.cdref.detectChanges();

        /*setTimeout(() => {
            this.someProperty = true;
            this.cdref.detectChanges(); // Fuerza una nueva verificación de cambios
          }, 0);*/

        this.asssitantId();
    }

    asssitantId(): void{
        this.api.assistantIdService(this.data.idAssistant).subscribe({
            next: (response: any) => {
                this.items = response;
                const employee = response?.employee;
                this.fullName = employee?.fullName;
                this.idAssitant = response?.id;
                this.imageSignature =  response?.signature?.url ?? '';
            }, error: (e: any) => console.log(e)
        });
    }

    urlImage(url: any): string{
        return environment.urlApp+url;
   }

    closeModal(): void {
        this.dialogRef.close();
    }

    onSubmit(): void{
        if (this.formInit.value.signatureUpload) {
            const request = {
                'formId': this.items.form.id,
                'employeeUid': this.items.employee.uid
              };
            this.uploadSave(this.formInit.value.signatureUpload,request);
        }
    }

    async uploadSave(file,data): Promise<void> {
        if (file) {
            const formData = new FormData();
            formData.append('file', file.get('files'));
            formData.append('body', JSON.stringify(data));

            const form = this.formInit.value;
            await this.api.updateAssitantService(formData,this.data.idAssistant).subscribe({
                next: (response: any) => {
                    if (response) {
                            const toast = this.swaAlert.toast();
                            this.closeModal();
                            toast.fire({ icon: 'success', title: 'Firma guardada correctamente' }).then((() => {  }));
                    }
                }, error: (e: any) => this.swaAlert.toastErrorUpload()
            });
        }
    }
}

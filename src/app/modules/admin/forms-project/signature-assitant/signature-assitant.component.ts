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
        this.cdref.detectChanges();
        this.asssitantId();
    }

    asssitantId(): void{
        this.api.assistantFormEmpService(Number(this.data.idForm),this.data.employee).subscribe({
            next: (response: any) => {
                this.items = response?.data[0];
                const employee = response?.data[0]?.employee;
                this.fullName = employee.fullName;
                this.idAssitant = response.data[0].id;
                this.imageSignature = response.data[0].signature ? this.urlImage(response.data[0]?.signature.formats.thumbnail.url) : null;
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
            this.uploadSave(this.formInit.value.signatureUpload);
        }
    }

    async uploadSave(file): Promise<void> {
        if (file) {
            const form = this.formInit.value;
            await this.api.uploadService(file).subscribe({
                next: (data: any) => {
                    if (data) {
                        form.signature = data[0].id;
                        this.formSave();
                    }
                }, error: (e: any) => this.swaAlert.toastErrorUpload()
            });
        }
    }

    async formSave(): Promise<void>{
        await this.api.updateAssitantService(this.formInit.value,this.idAssitant)
           .subscribe({
              next: (item: any) => {
                if(item){
                    const toast = this.swaAlert.toast();
                    this.closeModal();
                    toast.fire({ icon: 'success', title: 'Firma guardada correctamente' }).then((() => {  }));
                }
              },error: (e: any) => this.swaAlert.toastErrorUpdate()
           });
    }

    /*
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }*/

}

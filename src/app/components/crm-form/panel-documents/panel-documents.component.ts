import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListComponent } from 'app/components/list/list-component';
import { ApiService } from 'app/services/api.service';

@Component({
    selector: 'app-panel-documents',
    templateUrl: './panel-documents.component.html',
    styleUrls: ['./panel-documents.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => PanelDocumentsComponent)
        }
    ]
})
export class PanelDocumentsComponent extends ListComponent implements OnInit, ControlValueAccessor {

    @Input() items: any;
    files = new FormControl('');
    listFiles: boolean = true;
    uploadFiles: boolean = false;
    value: any;

    override apiItems$ = this.api.employeesService();
    override colums = [];

    constructor(
        protected api: ApiService,
    ) {
        super(api);
    }

    onChange: any = () => {
    };
    onTouched: any = () => {
    };
    propagateChange: any = (_: any) => {
    };

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    itemValue($event: MouseEvent): void {
        this.propagateChange(this.value);
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.value = value;
            this.propagateChange(this.value);
        }
    }

    setDisabledState?(isDisabled: boolean): void {
        throw new Error('Method not implemented.');
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }


    uploadFile(item): void {
        if (item === 'UPLOAD_FILES_SHOW') {
            this.writeValue(true);
            this.uploadFiles = true;
            this.listFiles = false;
        } else {
            this.uploadFiles = false;
            this.listFiles = true;
        }
    }

    initForm(): void {
    }

}

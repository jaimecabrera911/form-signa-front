import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from '../default-input';
import { FileUpload } from 'app/components/upload/file-upload';
import * as _moment from 'moment';

const moment = _moment;

@Component({
    selector: 'app-input-upload-files',
    templateUrl: './input-upload-files.component.html',
    styleUrls: ['./input-upload-files.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputUploadFilesComponent)
        }
    ]
})
export class InputUploadFilesComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    fileUpload = new FileUpload();
    files: File[] = [];
    base64Image?: string | ArrayBuffer = null;
    previewImage: string | null = null;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    onRemove(event): void {
        this.fileUpload.onRemove(event, this.files);
        if(this.files.length <= 0){
            this.value = null;
            this.writeValue(null);
        }else{
            this.uploadFiles();
        }
    }

    onSelect(event): void {
        this.fileUpload.onSelect(event, this.files);
        this.uploadFiles();
    }

    uploadFiles(): void {
        if (this.files.length <= 3) {
            const formData = new FormData();
            for (const file of this.files) {
                const fileName = this.formatName(file, 'file');
                formData.append('files', fileName);
            }
            this.value = formData;
            this.writeValue(formData);
        }
    }

    nameSignature(type: any, file: File): any {
        const ext = file.name.split('.');
        const typeName = type ? type : 'item';
        const random = Math.random().toString(36).substring(2, 12);
        const today = new Date();
        const dateFormat = moment(today).format('YYYYMMDDHHmmss');

        return `${typeName}_${dateFormat}_${random}.${ext[1]}`;
    }

    formatName(file: File, type: any): File {
        const filename = this.nameSignature(type,file);
        return new File([file], filename, { type: file.type });
    }

}

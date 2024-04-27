import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from '../default-input';
import { FileUpload } from 'app/components/upload/file-upload';
import * as _moment from 'moment';

const moment = _moment;

@Component({
    selector: 'app-input-upload-image',
    templateUrl: './input-upload-image.component.html',
    styleUrls: ['./input-upload-image.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputUploadImageComponent)
        }
    ]
})
export class InputUploadImageComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    @Input() typeImage?: string;
    fileUpload = new FileUpload();
    files: File[] = [];
    base64Image?: string | ArrayBuffer = null;
    previewImage: string | null = null;
    fileToUpload: any;
    imageUrl: any;

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
            this.uploadImage();
        }
    }

    onSelect(event): void {
        this.fileUpload.onSelect(event, this.files);
        this.uploadImage();
    }

    nameSignature(type: any): any{
        const typeName = type ? type : 'image';
        const random = Math.random().toString(36).substring(2,12);
        const today = new Date();
        const dateFormat = moment(today).format('YYYYMMDDHHmmss');
        return `${typeName}_${dateFormat}_${random}.png`;
    }

    uploadImage(): void {
        if (this.files.length > 0) {
            const file = this.formatNameImage(this.files[0],'profile');
            const formData = new FormData();
            formData.append('files', file);
            this.value = formData;
            this.writeValue(formData);
        }
    }

    formatNameImage(file: any, typeImage: any): File{
        const filename = this.nameSignature(typeImage);
        return new File([file], filename, { type: 'image/png' });
    }

}

import { Component, Input, ViewChild, OnInit, HostListener, AfterViewInit, ElementRef, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from '../default-input';
import * as _moment from 'moment';

const moment = _moment;

@Component({
    selector: 'app-input-signature-canvas',
    templateUrl: './input-signature-canvas.component.html',
    styleUrls: ['./input-signature-canvas.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputSignatureCanvasComponent)
        }
    ]
})
export class InputSignatureCanvasComponent extends DefaultInput implements AfterViewInit, OnInit, ControlValueAccessor {

    @Input() name: string;
    @Input() item1: string;
    @Input() item2: string;
    @ViewChild('sigPad', { static: true }) sigPad: ElementRef;
    sigPadElement: any;
    context: any;
    isDrawing = false;
    codeImge = false;
    img: any;

    constructor() {
        super();
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterViewInit(): void {
        this.sigPadElement = this.sigPad.nativeElement;
        this.context = this.sigPadElement.getContext('2d');
        this.context.strokeStyle = '#000000';
    }

    ngOnInit(): void {
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    @HostListener('document:mouseup', ['$event'])
    onMouseUp(e): void {
        this.isDrawing = false;
    }

    onMouseDown(e): void {
        this.isDrawing = true;
        const coords = this.relativeCoords(e);
        this.context.moveTo(coords.x, coords.y);
    }

    onMouseMove(e): void {
        if (this.isDrawing) {
            const coords = this.relativeCoords(e);
            this.context.lineTo(coords.x, coords.y);
            this.context.stroke();
        }
    }

    relativeCoords(event: any): any {
        const bounds = event.target.getBoundingClientRect();
        const x = event.clientX - bounds.left;
        const y = event.clientY - bounds.top;
        return { x: x, y: y };
    }

    // eslint-disable-next-line @typescript-eslint/member-ordering
    clear(): void {
        this.context.clearRect(0, 0, this.sigPadElement.width, this.sigPadElement.height);
        this.context.beginPath();
        this.codeImge = false;
    }

    nameSignature(): any{
        const document = this.item2 ? this.item2 : '';
        const random = Math.random().toString(36).substring(2,12);
        const today = new Date();
        const dateFormat = moment(today).format('YYYYMMDDHHmmss');
        return `signature_${dateFormat}_${document}_${random}.png`;
    }

    save(): void {
        this.img = this.sigPadElement.toDataURL('image/png');
        const item: any = this.dataURLtoFile(this.img,this.nameSignature());
        const formData = new FormData();
        formData.append('files', item);
        this.value = formData;
        this.writeValue(formData);
        this.codeImge = true;
    }

    converFile(dataUrl: string, name: any): any{
        return  new File([Uint8Array.from(btoa(dataUrl), (m: any) => m.codePointAt(0))],
            name,{ type: 'image/png' });
    }

    dataURLtoFile(dataurl, filename): File {
        const  arr = dataurl.split(',');
            const mime = arr[0].match(/:(.*?);/)[1];
            const bstr = atob(arr[arr.length - 1]);
            let n = bstr.length;
            const u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }
}

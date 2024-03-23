import {Component, Input, ViewChild, OnInit, HostListener, AfterViewInit, ElementRef, forwardRef} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DefaultInput} from '../default-input';

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
export class InputSignatureCanvasComponent extends DefaultInput  implements AfterViewInit,  OnInit, ControlValueAccessor  {

    @Input() name: string;
    @ViewChild('sigPad',{static: true}) sigPad: ElementRef;
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

    save(): void {
      this.img = this.sigPadElement.toDataURL('image/png');
      this.value = this.img;
      this.itemValue(this.img);
      this.codeImge = true;
    }
}

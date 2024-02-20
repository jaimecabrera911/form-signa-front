import {
    Component,
    Input,
    ViewChild,
    OnInit,
    HostListener,
    AfterViewInit,
    ElementRef,
  } from '@angular/core';

@Component({
  selector: 'app-canvas-signature',
  templateUrl: './canvas-signature.component.html',
  styleUrls: ['./canvas-signature.component.scss']
})
export class CanvasSignatureComponent implements AfterViewInit, OnInit  {

    @Input() name: string;
    @ViewChild('sigPad') sigPad: ElementRef;
    sigPadElement: any;
    context: any;
    isDrawing = false;
    img: any;

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngAfterViewInit(): void {
        console.log('sig:: ', this.sigPad);
        this.sigPadElement = this.sigPad.nativeElement;
        this.context = this.sigPadElement.getContext('2d');
        console.log('context:: ', this.context);
        this.context.strokeStyle = '#3742fa';
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
    }

    save(): void {
      this.img = this.sigPadElement.toDataURL('image/png');
      console.log(this.img);
    }


}

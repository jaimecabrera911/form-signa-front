import {
    Component,
    Input,
    ViewChild,
    OnInit,
    HostListener,
    AfterViewInit,
    ElementRef,
  } from '@angular/core';
import { Path } from 'app/components/routers/path';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @Input() name: string;
    @ViewChild('sigPad') sigPad: ElementRef;
    sigPadElement: any;
    context: any;
    isDrawing = false;
    img: any;
    title = new Path().getModule();
    subtitle = 'Listado compañias';
    searchPanel: boolean = false;

    ngOnInit(): void {
    }



}

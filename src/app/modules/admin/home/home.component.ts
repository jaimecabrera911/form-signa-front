import {
    Component,
    Input,
    ViewChild,
    OnInit,
    HostListener,
    AfterViewInit,
    ElementRef
  } from '@angular/core';
import { Path } from 'app/components/routers/path';
import { LoginService } from 'app/services/login.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    @Input() name: string;
    @ViewChild('sigPad') sigPad: ElementRef;

    title = new Path().getModule();
    subtitle = 'Listado compañias';
    sigPadElement: any;
    context: any;
    isDrawing = false;
    img: any;
    searchPanel: boolean = false;
    user: any;
    profilePicture: any;

    constructor(
        private login: LoginService
    ){}

    ngOnInit(): void {
        this.user = this.login.currentEmployeeValue ? this.login.currentEmployeeValue[0].firstName : 'Cargando' ;
        this.profilePicture = this.login.currentEmployeeValue ? this.urlImage(this.login.currentEmployeeValue[0].profilePicture.url) : 'Cargando' ;
    }

    urlImage(url: any): string {
        return url ? environment.urlApp + url : `${environment.urlApp}/src/assets/images/avatars/user.png`;
    }
}

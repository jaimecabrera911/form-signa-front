import {
    Component,
    Input,
    ViewChild,
    OnInit,
    ElementRef
  } from '@angular/core';
import { Path } from 'app/components/routers/path';
import { ApiService } from 'app/services/api.service';
import { LoginService } from 'app/services/login.service';


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
    reportForms: any = {};
    reportProjects: any = {};

    constructor(
        protected login: LoginService,
        protected api: ApiService,
    ){}

    ngOnInit(): void {
        this.user = this.login?.currentUserValue?.fullName ?? '' ;
        this.profilePicture = this.login.currentUserValue ? this.urlImage(this.login?.currentUserValue?.profilePicture) : 'Cargando' ;
        this.getReportsProject();
        this.getReportForms();
    }

    getReportsProject(): void {
        this.api.reportProjectsService().subscribe({
            next: (response: any) => {
                this.getFormatReportProjects(response);
            }, error: (e: any) => console.log(e)
        });
    }

    getFormatReportProjects(response: any): void{
        const reportComplete = response.filter((items: any) => items.state === 'completed') || 0;
        const reportActive = response.filter((items: any) => items.state === 'active') || 0;
        const reportPending = response.filter((items: any) => items.state === 'pending') || 0;
        this.reportProjects = { completed: reportComplete[0], active: reportActive[0], pending: reportPending[0]};
    }

    getReportForms(): void {
        this.api.reportFormsService().subscribe({
            next: (response: any) => {
                this.getFormatReportForms(response);
            }, error: (e: any) => console.log(e)
        });
    }


    getFormatReportForms(response: any): void{
        const reportCreated = response.filter((items: any) => items.state === 'created') || 0;
        const reportComplete = response.filter((items: any) => items.state === 'completed') || 0;
        const reportPending = response.filter((items: any) => items.state === 'pending') || 0;
        this.reportForms = { created: reportCreated[0] || 0, completed: reportComplete[0] || 0, pending: reportPending[0] || 0};
    }

    urlImage(url: any): any {
        return url ? url : '../../../../assets/images/avatars/user.png';
    }
}

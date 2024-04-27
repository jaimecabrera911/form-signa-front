import { Component, ContentChildren, Inject, Input, OnInit } from '@angular/core';
import { ActionsDirective } from './actions.directive';
import { PanelsDirective } from './panels.directive';
import { AditionalDirective } from './aditional.directive';
import { Router,NavigationEnd  } from '@angular/router';
import { Path } from '../routers/path';
@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    @Input() title: string;
    @Input() subtitle?: string;
    @Input() searchPanel?: boolean;
    @ContentChildren(ActionsDirective) children: any;
    @ContentChildren(PanelsDirective) panels: any;
    @ContentChildren(AditionalDirective) aditional: any;
    current = new Path().getUrlCurrent();
    moduleId = new Path().getModuleId();
    item: any = '';

    constructor() {

    }

        ngOnInit(): void {

           this.validateUrl();
        }

        validateUrl(): any{
            if(this.moduleId === this.current){
                this.item = false;
            }else{
                this.item = true;
            }
        }

        btnBack(): void{
            history.back();
        }

    }

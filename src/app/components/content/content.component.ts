import {Component, ContentChildren, Input, OnInit} from '@angular/core';
import {ActionsDirective} from './actions.directive';
import {PanelsDirective} from './panels.directive';

@Component({
    selector: 'app-content',
    templateUrl: './content.component.html',
    styleUrls: ['./content.component.scss']
})
export class ContentComponent implements OnInit {

    @Input() title: string;
    @Input() subtitle?: string;
    @ContentChildren(ActionsDirective) children: any;
    @ContentChildren(PanelsDirective) panels: any;

    constructor() {
    }

    ngOnInit(): void {
    }

}

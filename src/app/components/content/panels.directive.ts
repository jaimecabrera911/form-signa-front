import {Directive, TemplateRef} from '@angular/core';

@Directive({
    selector: '[appPanels]'
})
export class PanelsDirective {

    constructor(public templateRef: TemplateRef<any>) {
    }

}

import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appActions]'
})
export class ActionsDirective {

    constructor(public templateRef: TemplateRef<any>) { }

}

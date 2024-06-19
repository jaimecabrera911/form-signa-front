import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appActionsTable]'
})
export class ActionsTableDirective {

    constructor(public templateRef: TemplateRef<any>) { }

}

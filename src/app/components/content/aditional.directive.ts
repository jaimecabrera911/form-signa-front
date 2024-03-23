import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appAditional]'
})
export class AditionalDirective {

    constructor(public templateRef: TemplateRef<any>) {
    }

}

import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appActionsMultimedia]'
})
export class ActionsMultimediaDirective {

    constructor(public templateRef: TemplateRef<any>) { }


}

import { Directive, TemplateRef } from '@angular/core';

@Directive({
  selector: '[appPanelsMultimedia]'
})
export class PanelsMultimediaDirective {

    constructor(public templateRef: TemplateRef<any>) {
    }

}

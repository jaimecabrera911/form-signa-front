import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appAditionalMultimedia]'
})
export class AditionalMultimediaDirective {

    constructor(public templateRef: TemplateRef<any>) { }

}

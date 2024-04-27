import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { DefaultInput } from '../default-input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-radio',
  templateUrl: './input-radio.component.html',
  styleUrls: ['./input-radio.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => InputRadioComponent)
      }
  ]
})
export class InputRadioComponent extends DefaultInput implements OnInit, ControlValueAccessor  {

    @Input() options: any;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}

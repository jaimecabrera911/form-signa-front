import { Component, OnInit, forwardRef } from '@angular/core';
import {DefaultInputComponent} from '../../../core/default-input-component';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from '../default-input';

@Component({
  selector: 'app-input-int',
  templateUrl: './input-int.component.html',
  styleUrls: ['./input-int.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => InputIntComponent)
      }
  ]
})
export class InputIntComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

}

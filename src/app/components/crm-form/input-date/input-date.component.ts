import {Component, forwardRef, OnInit} from '@angular/core';
import {DefaultInput} from '../default-input';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {FormControl} from '@angular/forms';

import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';


export const MY_FORMATS = {
  parse: {
      dateInput: 'LL'
  },
  display: {
      dateInput: 'YYYY/MM/DD',
      monthYearLabel: 'YYYY',
      dateA11yLabel: 'LL',
      monthYearA11yLabel: 'YYYY'
  }
};

@Component({
    selector: 'app-input-date',
    templateUrl: './input-date.component.html',
    styleUrls: ['./input-date.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputDateComponent),
        },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
    ]
})
export class InputDateComponent extends DefaultInput implements OnInit, ControlValueAccessor {

   


    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    selectDae($event: any): void {
        this.value = $event.value;//Ejemplo
        this.propagateChange(this.value);
    }
}

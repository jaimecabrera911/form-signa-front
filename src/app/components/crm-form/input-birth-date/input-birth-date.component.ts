import { Component, forwardRef, OnInit } from '@angular/core';
import { DefaultInput } from '../default-input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import * as _moment from 'moment';
import { Moment } from 'moment';

const moment = _moment;
export const MY_FORMATS = {
    parse: {
        dateInput: 'LL'
    },
    display: {
        dateInput: 'YYYY-MM-DD',
        monthYearLabel: 'YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'YYYY'
    }
};


@Component({
  selector: 'app-input-birth-date',
  templateUrl: './input-birth-date.component.html',
  styleUrls: ['./input-birth-date.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => InputBirthDateComponent),
      },
      { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
      { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS }
  ]
})
export class InputBirthDateComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    maxDate: Date;
    date: Date;

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.maxDate = new Date();
        this.maxDate.setMonth(this.maxDate.getMonth() - 12 * 18);
    }

    addEvent(event): void {
        const date: Moment = event.value;
        if (date) {
            const dateFormat = moment(date).format('YYYY-MM-DD');
            this.value = dateFormat;
            this.propagateChange(this.value);
        }
    }

}

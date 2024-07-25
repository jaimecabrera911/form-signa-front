import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {DefaultInput} from '../default-input';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {MatSelectChange} from '@angular/material/select';

export interface Option {
    key: string;
    label: string;
}

@Component({
    selector: 'app-input-select',
    templateUrl: './input-select.component.html',
    styleUrls: ['./input-select.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputSelectComponent)
        }
    ]
})
export class InputSelectComponent extends DefaultInput implements OnInit, ControlValueAccessor {
    @Input() options: any;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

    select($event: MatSelectChange): void {
        this.value = $event.value ? $event.value : null;
        this.propagateChange($event.value);
    }
}

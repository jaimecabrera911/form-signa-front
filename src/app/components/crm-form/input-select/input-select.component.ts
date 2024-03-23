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
    //@Input() crmField: any;
    //options: Option[] = [];
    @Input() options: any;

    constructor() {
        super();
    }

    ngOnInit(): void {
        /*const options = this.crmField['options'];
        Object.keys(options).forEach((value) => {
            this.options.push({
                key: value,
                label: this.crmField['options'][value].value
            });
        });*/
        console.log('opciones: ',this.options);
    }

    select($event: MatSelectChange): void {
        console.log('event select ',$event);
        this.value = $event.value;
        this.propagateChange($event.value);
    }
}

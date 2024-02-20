import {Component, forwardRef, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DefaultInput} from '../default-input';

@Component({
    selector: 'app-input-number',
    templateUrl: './input-number.component.html',
    styleUrls: ['./input-number.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputNumberComponent)
        }
    ]
})
export class InputNumberComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}

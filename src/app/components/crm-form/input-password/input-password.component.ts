import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from '../default-input';

@Component({
    selector: 'app-input-password',
    templateUrl: './input-password.component.html',
    styleUrls: ['./input-password.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputPasswordComponent)
        }
    ]
})
export class InputPasswordComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}

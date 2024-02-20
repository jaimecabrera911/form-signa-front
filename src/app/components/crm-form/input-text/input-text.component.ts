import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DefaultInput} from '../default-input';

@Component({
    selector: 'app-input-text',
    templateUrl: './input-text.component.html',
    styleUrls: ['./input-text.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputTextComponent)
        }
    ]
})
export class InputTextComponent extends DefaultInput implements OnInit, ControlValueAccessor {
    @Input() type: string = 'text';

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}

import {Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DefaultInput} from '../default-input';

@Component({
    selector: 'app-input-textarea',
    templateUrl: './input-textarea.component.html',
    styleUrls: ['./input-textarea.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputTextareaComponent)
        }
    ]
})
export class InputTextareaComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    @Input() rows?: number;
    @Input() cols?: number;

    constructor() {
        super();
    }

    ngOnInit(): void {
    }

}

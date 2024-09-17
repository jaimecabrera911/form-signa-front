import { Component, forwardRef, EventEmitter, Input, OnInit, Output, ChangeDetectorRef } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from '../default-input';

@Component({
    selector: 'app-input-qty',
    templateUrl: './input-qty.component.html',
    styleUrls: ['./input-qty.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputQtyComponent)
        }
    ]
})
export class InputQtyComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    /**
     * @description Use Mat Color `color='accent' / color='primary`
     */
    @Input() color: string;

    /**
     * @description Max limit of quantity
     */
    @Input() limit = 100;

    /**
     * @description Disables quantity input
     * @note Can be used with reactive for api
     */
    @Input() disabled: boolean;

    /**
     * @description Emits on input change
     */
    @Output() quantityChange: number;

    /**
     * @description Max limit of quantity
     */

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
    }

}

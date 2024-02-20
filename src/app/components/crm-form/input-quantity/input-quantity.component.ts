import { Component, forwardRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DefaultInput } from '../default-input';

@Component({
    selector: 'app-input-quantity',
    templateUrl: './input-quantity.component.html',
    styleUrls: ['./input-quantity.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputQuantityComponent)
        }
    ]

})
export class InputQuantityComponent extends DefaultInput implements OnInit, ControlValueAccessor {


   /* @Input() color = 'primary';
    @Input() limit = 15;
    //@Output() quantityChange: number;
    value=0;
    */


    @Input() title: string;
    @Input() value: number = 0;
    @Input() min: number = 1;
    @Input() max: number = 99999999999;
    @Output() changeValue: EventEmitter<number> = new EventEmitter();
    constructor() {
        super();
    }

    ngOnInit(): void {
        this.validate();
    }

    validate(): void {
        if (this.value <= this.min) {
            this.value = this.min;
        }
        if (this.value >= this.max) {
            this.value = this.max;
        }
    }

    onAdd(): void {
        this.value = this.value + 1;
        this.validate();
        this.changeValue.emit(this.value);
    }

    onRemove(): void {
        this.value = this.value - 1;
        this.validate();
        this.changeValue.emit(this.value);
    }

    change($event: Event): void {
        // @ts-ignore
        this.value = $event.target.value;
        this.validate();
        this.changeValue.emit(this.value);
    }
}

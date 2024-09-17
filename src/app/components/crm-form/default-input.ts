import { ControlValueAccessor, FormGroup } from '@angular/forms';
//import {Component, Input, Output} from '@angular/core';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-default-input',
    template: '<p></p>',
    styleUrls: []
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export abstract class DefaultInput implements ControlValueAccessor {

    @Output() changeValue: EventEmitter<any> = new EventEmitter<any>();
    @Input() icon?: any;
    @Input() valueItem?: any;
    @Input() label: string = '';
    @Input() field?: any;
    @Input() validateFormSumt?: boolean = false;
    @Input() formGroupChild?: FormGroup;
    @Input() disabled?: boolean = false;
    @Input() required: boolean;
    @Input() readonly?: boolean = false;
    @Input() fields?: string[] = [];
    value: any = '';
    valueCont: any = '';


    protected constructor() {
        this.valueCont = this.valueCont ? this.valueCont : 0;
    }

    // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
    ngOnInit(): void {
    }

    change($event: KeyboardEvent): void {
        this.propagateChange(this.value);
    }

    onChange: any = () => {
    };
    onTouched: any = () => {
    };
    propagateChange: any = (_: any) => {
    };

    registerOnChange(fn: any): void {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouched = fn;
    }

    itemValue($event: MouseEvent): void {
        this.propagateChange(this.value);
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this.value = value;
            this.valueCont = value;
            this.propagateChange(this.value);
        }
    }

    writeCantValue(item: any): void {
        if (item !== undefined) {
            this.valueCont = item;
            this.propagateChange(this.valueCont);
        }
    }
}

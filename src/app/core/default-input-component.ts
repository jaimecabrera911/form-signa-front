import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
    selector: 'app-default-input',
    template: '<p></p>',
    styleUrls: []
})
export abstract class DefaultInputComponent implements OnInit {

    @Input() field: any;
    @Input() formGroupChild?: FormGroup;
    @Input() disabled: boolean = false;
    @Input() required: boolean = false;
    @Output() changeValue: EventEmitter<any> = new EventEmitter<any>();
    @Input() relationName: string;
    @Input() moduleRelated: string;
    @Input() fields: string[] = [];
    value: any;

    ngOnInit(): void {
    }

    change($event: KeyboardEvent): void {
        this.changeValue.emit(this.value);
    }
}

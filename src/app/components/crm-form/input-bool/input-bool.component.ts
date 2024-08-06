import {Component, EventEmitter, Input, OnInit, Output, forwardRef} from '@angular/core';
import {MatSlideToggleChange} from '@angular/material/slide-toggle';
import { DefaultInput } from '../default-input';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-input-bool',
    templateUrl: './input-bool.component.html',
    styleUrls: ['./input-bool.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputBoolComponent)
        }
    ]
})
export class InputBoolComponent extends DefaultInput implements OnInit {

    constructor() {
        super();
    }

    override ngOnInit(): void {
        super.ngOnInit();
    }

    onChangeCheckbox($event: MatSlideToggleChange): void {
        this.changeValue.emit($event.checked);
        this.writeValue($event.checked === null ? false : $event.checked);
    }
}

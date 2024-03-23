import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { DefaultInput } from '../default-input';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';


@Component({
    selector: 'app-input-multi-select',
    templateUrl: './input-multi-select.component.html',
    styleUrls: ['./input-multi-select.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            multi: true,
            useExisting: forwardRef(() => InputMultiSelectComponent)
        }
    ]
})
export class InputMultiSelectComponent extends DefaultInput implements OnInit, ControlValueAccessor {

    @Input() options: any;
    showFilter: any = true;
    selectedItem: any = [];
    dropdownSettings: any = {};

    constructor() {
        super();
    }

    ngOnInit(): void {
        this.dropdownSettings = {
            singleSelection: false,
            idField: 'id',
            textField: 'name',
            searchPlaceholderText: 'Buscar',
            selectAllText: 'Seleccionar todo',
            unSelectAllText: 'Deseleccionar todo',
            itemsShowLimit: 10,
            allowSearchFilter: this.showFilter,
        };
    }

    onFilterChange(item: any): void {
        console.log(item);
        this.value = this.selectedItem;
        this.writeValue(this.selectedItem);
    }
    onDropDownClose(item: any): void {
        console.log(item);
        this.writeValue(this.selectedItem);
        this.value = this.selectedItem;
    }

    onItemSelect(item: any): void {
        console.log(item);
        this.writeValue(this.selectedItem);
        this.value = this.selectedItem;
    }

    onDeSelect(item: any): void {
        console.log(item);
        this.writeValue(this.selectedItem);
        this.value = this.selectedItem;
    }

    onSelectAll(items: any): void {
        console.log(items);
        this.writeValue(this.selectedItem);
        this.value = this.selectedItem;
    }

    onDeSelectAll(items: any): void {
        console.log(items);
        this.writeValue(this.selectedItem);
        this.value = this.selectedItem;
    }
}

import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { DefaultInput } from '../default-input';
import { MatSelectChange } from '@angular/material/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input-slect-autocomplete',
  templateUrl: './input-slect-autocomplete.component.html',
  styleUrls: ['./input-slect-autocomplete.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => InputSelectAutocompleteComponent)
      }
  ]
})
export class InputSelectAutocompleteComponent extends DefaultInput implements OnInit, ControlValueAccessor {

  @Input() options: any;
  keyword = 'name';

  constructor() {
      super();
  }

  ngOnInit(): void {
  }

  selectEvent(item): void {
    this.propagateChange(item.code);
  }

  onChangeSearch(search: string): void  {
  }

  onFocused(e): void  {
  }

}

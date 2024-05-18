import {ChangeDetectorRef, Component, forwardRef, Input, OnInit} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DefaultInput} from '../default-input';

@Component({
  selector: 'app-input-email',
  templateUrl: './input-email.component.html',
  styleUrls: ['./input-email.component.scss'],
  providers: [
      {
          provide: NG_VALUE_ACCESSOR,
          multi: true,
          useExisting: forwardRef(() => InputEmailComponent)
      }
  ]
})
export class InputEmailComponent extends DefaultInput  implements OnInit {

    @Input() type: string = 'email';

    constructor(private changeDetectorRef: ChangeDetectorRef) {
        super();
    }

    ngOnInit(): void {
        this.changeDetectorRef.detectChanges();
    }

}

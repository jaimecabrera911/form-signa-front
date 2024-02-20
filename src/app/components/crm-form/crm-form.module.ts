import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextComponent } from './input-text/input-text.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { InputSelectComponent } from './input-select/input-select.component';
import { MatSelectModule } from '@angular/material/select';
import { InputNumberComponent } from './input-number/input-number.component';
import { NgxNumberFormatModule } from 'ngx-number-format';
import { InputDateComponent } from './input-date/input-date.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { InputTextareaComponent } from './input-textarea/input-textarea.component';
import { NativeDateModule } from '@angular/material/core';
import { InputQuantityComponent } from './input-quantity/input-quantity.component';
import { QuantityInputModule } from '@nghacks/quantity-input';
import { MatIconModule } from '@angular/material/icon';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { InputBoolComponent } from './input-bool/input-bool.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { InputIntComponent } from './input-int/input-int.component';
import { InputQtyComponent } from './input-qty/input-qty.component';
import { InputSignatureCanvasComponent } from './input-signature-canvas/input-signature-canvas.component';
import { MatButtonModule } from '@angular/material/button';
import { InputPasswordComponent } from './input-password/input-password.component';

@NgModule({
    declarations: [
        InputTextComponent,
        InputSelectComponent,
        InputNumberComponent,
        InputDateComponent,
        InputTextareaComponent,
        InputBoolComponent,
        InputIntComponent,
        InputQtyComponent,
        InputQuantityComponent,
        InputSignatureCanvasComponent,
        InputPasswordComponent
    ],
    exports: [
        InputTextComponent,
        InputSelectComponent,
        InputNumberComponent,
        InputDateComponent,
        InputTextareaComponent,
        InputBoolComponent,
        InputIntComponent,
        InputQtyComponent,
        InputQuantityComponent,
        InputSignatureCanvasComponent,
        InputPasswordComponent
    ],
    imports: [
        CommonModule,
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        MatDatepickerModule,
        MatSlideToggleModule,
        NativeDateModule,
        MatIconModule,
        NgxNumberFormatModule,
        MomentDateModule,
        QuantityInputModule
    ]
})
export class CrmFormModule { }


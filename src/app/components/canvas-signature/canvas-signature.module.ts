import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CanvasSignatureComponent } from './canvas-signature.component';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CanvasSignatureComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule
  ],
  exports: [
    CanvasSignatureComponent
  ]
})
export class CanvasSignatureModule { }

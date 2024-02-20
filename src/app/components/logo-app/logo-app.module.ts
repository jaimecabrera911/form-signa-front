import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogoAppComponent } from './logo-app.component';



@NgModule({
  declarations: [
    LogoAppComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
      LogoAppComponent
  ],
})
export class LogoAppModule { }

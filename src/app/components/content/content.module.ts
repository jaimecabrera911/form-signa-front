import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ActionsDirective } from './actions.directive';
import { PanelsDirective } from './panels.directive';
import { MatCardModule } from '@angular/material/card';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { AditionalDirective } from './aditional.directive';
import { MatFormFieldModule } from '@angular/material/form-field';


@NgModule({
    declarations: [
        ContentComponent,
        ActionsDirective,
        PanelsDirective,
        AditionalDirective
    ],
    exports: [
        ContentComponent,
        ActionsDirective,
        PanelsDirective,
        AditionalDirective
    ],
    imports: [
        CommonModule,
        MatCardModule,
        MatIconModule,
        MatFormFieldModule
    ]
})
export class ContentModule { }

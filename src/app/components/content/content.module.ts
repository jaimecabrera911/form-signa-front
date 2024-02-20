import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent } from './content.component';
import { ActionsDirective } from './actions.directive';
import { PanelsDirective } from './panels.directive';
import {MatCardModule} from "@angular/material/card";



@NgModule({
    declarations: [
        ContentComponent,
        ActionsDirective,
        PanelsDirective
    ],
    exports: [
        ContentComponent,
        ActionsDirective,
        PanelsDirective
    ],
    imports: [
        CommonModule,
        MatCardModule
    ]
})
export class ContentModule { }

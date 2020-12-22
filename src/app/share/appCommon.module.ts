import { NgModule } from '@angular/core';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzInputModule} from "ng-zorro-antd/input";
import {CommonModule} from "@angular/common";
import {NzOverlayModule} from "ng-zorro-antd/core/overlay";
import {NzPopoverModule} from 'ng-zorro-antd/popover';
import {NzToolTipModule} from "ng-zorro-antd/tooltip";
import {DragDropModule} from '@angular/cdk/drag-drop';
import {ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzRadioModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    NzOverlayModule,
    NzPopoverModule ,
    NzToolTipModule,
    DragDropModule,
    ReactiveFormsModule,
  ],
  exports:[
    NzRadioModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    CommonModule,
    NzOverlayModule,
    NzPopoverModule,
    NzToolTipModule,
    DragDropModule,
    ReactiveFormsModule
  ]
})
export class AppCommonModule { }

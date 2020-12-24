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
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzListModule} from "ng-zorro-antd/list";
import {NzAlertModule} from "ng-zorro-antd/alert";



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
    NzCheckboxModule,
    NzSpinModule,
    NzIconModule,
    NzGridModule,
    FormsModule,
    NzFormModule,
    NzAlertModule,
    NzListModule,
    NzToolTipModule,
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
    ReactiveFormsModule,
    NzCheckboxModule,
    NzSpinModule,
    NzIconModule,
    NzGridModule,
    FormsModule,
    NzFormModule,
    NzAlertModule,
    NzListModule,
    NzToolTipModule,
  ]
})
export class AppCommonModule { }

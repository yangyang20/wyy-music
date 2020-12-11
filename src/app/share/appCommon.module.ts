import { NgModule } from '@angular/core';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzInputModule} from "ng-zorro-antd/input";
import {CommonModule} from "@angular/common";
import {NzOverlayModule} from "ng-zorro-antd/core/overlay";
import {NzPopoverModule} from 'ng-zorro-antd/popover';




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
  ],
  exports:[
    NzRadioModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    CommonModule,
    NzOverlayModule,
    NzPopoverModule
  ]
})
export class AppCommonModule { }

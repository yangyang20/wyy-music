import { NgModule } from '@angular/core';
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzInputModule} from "ng-zorro-antd/input";
import {CommonModule} from "@angular/common";
import {NzOverlayModule} from "ng-zorro-antd/core/overlay";




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
  ],
  exports:[
    NzRadioModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule,
    NzInputModule,
    CommonModule,
    NzOverlayModule,
  ]
})
export class AppCommonModule { }

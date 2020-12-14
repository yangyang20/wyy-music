import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyLayerModalComponent } from './wy-layer-modal/wy-layer-modal.component';
import { WyLayerDefaultComponent } from './wy-layer-default/wy-layer-default.component';
import {AppCommonModule} from "../../appCommon.module";



@NgModule({
  declarations: [WyLayerModalComponent, WyLayerDefaultComponent],
  imports: [
    CommonModule,
    AppCommonModule,
  ],
  exports: [
    WyLayerModalComponent,
    WyLayerDefaultComponent,
    AppCommonModule,
  ],
})
export class WyLayerModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyLayerModalComponent } from './wy-layer-modal/wy-layer-modal.component';
import { WyLayerDefaultComponent } from './wy-layer-default/wy-layer-default.component';
import {AppCommonModule} from "../../appCommon.module";
import { WyLayerLoginComponent } from './wy-layer-login/wy-layer-login.component';
import { WyLayerRegisterComponent } from './wy-layer-register/wy-layer-register.component';



@NgModule({
  declarations: [WyLayerModalComponent, WyLayerDefaultComponent, WyLayerLoginComponent, WyLayerRegisterComponent],
  imports: [
    CommonModule,
    AppCommonModule,
  ],
  exports: [
    WyLayerModalComponent,
    WyLayerDefaultComponent,
    WyLayerLoginComponent,
    WyLayerRegisterComponent,
    AppCommonModule,
  ],
})
export class WyLayerModule { }

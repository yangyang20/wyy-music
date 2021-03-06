import { NgModule } from '@angular/core';
import {FormsModule} from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {WyUiModule} from "./wy-ui/wy-ui.module";
import {WyPlayerModule} from './wy-ui/wy-player/wy-player.module';
import {AppCommonModule} from "./appCommon.module";
import {CommonModule} from "@angular/common";



@NgModule({
  declarations: [],
  imports: [
    FormsModule,
    NzCarouselModule,
    NzIconModule,
    WyUiModule,
    WyPlayerModule,
    AppCommonModule,
  ],
  exports:[
    AppCommonModule,
    FormsModule,
    NzCarouselModule,
    NzIconModule,
    WyUiModule,
    WyPlayerModule,
  ]
})
export class ShareModule { }

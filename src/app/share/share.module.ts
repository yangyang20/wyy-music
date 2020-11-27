import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {WyUiModule} from "./wy-ui/wy-ui.module";
import {WyPlayerModule} from './wy-ui/wy-player/wy-player.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NzCarouselModule,
    NzIconModule,
    WyUiModule,
    WyPlayerModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    NzCarouselModule,
    NzIconModule,
    WyUiModule,
    WyPlayerModule,
  ]
})
export class ShareModule { }

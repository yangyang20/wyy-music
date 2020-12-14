import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyPlayerComponent } from './wy-player.component';
import {WySliderModule} from '../wy-slider/wy-slider.module';
import {FormsModule} from '@angular/forms';
import { WyPlayerPanelComponent } from './wy-player-panel/wy-player-panel.component';
import { WyScrollComponent } from './wy-scroll/wy-scroll.component';
import {AppCommonModule} from "../../appCommon.module";



@NgModule({
  declarations: [WyPlayerComponent, WyPlayerPanelComponent, WyScrollComponent],
  exports: [
    WyPlayerComponent,
    AppCommonModule,
  ],
  imports: [
    AppCommonModule,
    WySliderModule,
    FormsModule,
  ]
})
export class WyPlayerModule { }

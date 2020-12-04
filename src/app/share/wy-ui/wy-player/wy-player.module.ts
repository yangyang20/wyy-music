import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyPlayerComponent } from './wy-player.component';
import {WySliderModule} from '../wy-slider/wy-slider.module';
import {FormsModule} from '@angular/forms';
import { WyPlayerPanelComponent } from './wy-player-panel/wy-player-panel.component';



@NgModule({
  declarations: [WyPlayerComponent, WyPlayerPanelComponent],
  exports: [
    WyPlayerComponent,
  ],
    imports: [
        CommonModule,
        WySliderModule,
        FormsModule,
    ]
})
export class WyPlayerModule { }

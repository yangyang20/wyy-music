import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyPlayerComponent } from './wy-player.component';
import {WySliderModule} from '../wy-slider/wy-slider.module';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [WyPlayerComponent],
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

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WyPlayerComponent } from './wy-player.component';



@NgModule({
  declarations: [WyPlayerComponent],
  exports: [
    WyPlayerComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WyPlayerModule { }

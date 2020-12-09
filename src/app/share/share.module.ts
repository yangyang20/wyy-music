import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';
import {WyUiModule} from "./wy-ui/wy-ui.module";
import {WyPlayerModule} from './wy-ui/wy-player/wy-player.module';
import {NzRadioModule} from 'ng-zorro-antd/radio';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzTagModule} from "ng-zorro-antd/tag";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NzCarouselModule,
    NzIconModule,
    WyUiModule,
    WyPlayerModule,
    NzRadioModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    NzCarouselModule,
    NzIconModule,
    WyUiModule,
    WyPlayerModule,
    NzRadioModule,
    NzButtonModule,
    NzTableModule,
    NzTagModule,
  ]
})
export class ShareModule { }

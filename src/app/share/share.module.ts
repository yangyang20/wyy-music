import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NzIconModule } from 'ng-zorro-antd/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    NzCarouselModule,
    NzIconModule,
  ],
  exports:[
    CommonModule,
    FormsModule,
    NzCarouselModule,
    NzIconModule,
  ]
})
export class ShareModule { }

import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WySpiderStyle} from '../wy-spider.type';

@Component({
  selector: 'app-wy-slider-track',
  template:` <div class="wy-slider-track" [class.buffer]="wyBuffer" [ngStyle]="style" ></div>`,
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class WySliderTrackComponent implements OnInit,OnChanges {

  @Input()wyVertical:boolean = false    //是否垂直
  @Input()wyLength:number = 0  //长度
  @Input()wyBuffer:boolean = false  //是否是缓冲条

  style:WySpiderStyle = {}

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if (changes['wyLength']){
      if (this.wyVertical){
        this.style.height = this.wyLength + '%'
        this.style.width = null
        this.style.left = null
      }else {
        this.style.width = this.wyLength + '%'
        this.style.bottom = null
        this.style.height = null
      }
    }
  }

}

import {ChangeDetectionStrategy, Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {WySpiderStyle} from '../wy-spider.type';


@Component({
  selector: 'app-wy-slider-handle',
  template:` <div class="wy-slider-handle" [ngStyle]="style"></div>`,
  changeDetection:ChangeDetectionStrategy.OnPush,
})
export class WySliderHandleComponent implements OnInit,OnChanges {

  @Input() wyVertical:boolean = false //是否垂直方向变动
  @Input() wyOffset:number =0 //偏移量

  style:WySpiderStyle = {}

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['wyOffset']){
      this.style[this.wyVertical ? 'bottom':'left' ] = this.wyOffset + '%'
    }
  }

}

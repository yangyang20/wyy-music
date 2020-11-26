import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild
} from '@angular/core';


@Component({
  selector: 'app-wy-carousel',
  templateUrl: './wy-carousel.component.html',
  styleUrls: ['./wy-carousel.component.less'],
  changeDetection:ChangeDetectionStrategy.OnPush  //变更检测
})
export class WyCarouselComponent implements OnInit {
  @Input()acticeIndex=0

  @Output()changeSide = new EventEmitter<'pre'|'next'>()

  @ViewChild('dot',{static:true}) dotRef: TemplateRef<any> | undefined ;

  constructor() { }

  ngOnInit(): void {
  }

  //发送到carousel
  onChangeSlide(type:'pre'|'next'){
    this.changeSide.emit(type)
  }

}

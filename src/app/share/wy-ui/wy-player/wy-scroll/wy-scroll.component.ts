import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild, ElementRef, Output,EventEmitter
} from '@angular/core';

import BScroll from '@better-scroll/core';
import ScrollBar from '@better-scroll/scroll-bar';
import MouseWheel from '@better-scroll/mouse-wheel';
import {timer} from 'rxjs';



BScroll.use(MouseWheel);
BScroll.use(ScrollBar);

@Component({
  selector: 'app-wy-scroll',
  template: `
    <div class="wy-scroll" #wrap>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`.wy-scroll{width: 100%; height: 100%; overflow: hidden;}`],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyScrollComponent implements OnInit ,AfterViewInit,OnChanges{

  //内容变动刷新之后才能滚动

  //用来触发刷新
  @Input() data:any = []

  @Input() refreshDelay = 50; //延迟的刷新时间
  private bs!: BScroll;

  @ViewChild('wrap',{static:true,read:ElementRef})private wrapRef:ElementRef|undefined
  constructor(readonly el:ElementRef) { }


  @Output() private onScrollEnd = new EventEmitter<number>();
  ngOnInit(): void {

  }
  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['data'].firstChange &&changes['data']&&this.bs){
      this.refreshScroll()
    }
  }
  ngAfterViewInit(): void {
    this.bs = new BScroll(this.wrapRef!.nativeElement, {
      scrollbar: {
        interactive: true
      },
      mouseWheel: {}
    })
    //滚动即将结束
    this.bs.scroller.actions.hooks.on('scrollEnd', (pos:any) => this.onScrollEnd.emit(<number>pos.y));
  }


  private refresh() {
    this.bs.refresh();
  }

  refreshScroll() {
    timer(this.refreshDelay).subscribe(() => {
      this.refresh();
    });
  }

  scrollToElement(...args:any) {
    this.bs.scrollToElement.apply(this.bs, args);
  }
}

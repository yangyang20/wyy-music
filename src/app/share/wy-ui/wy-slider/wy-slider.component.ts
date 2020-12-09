import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  ElementRef, EventEmitter,
  Inject,
  Input, OnChanges,
  OnInit, Output, SimpleChanges,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import {SliderEventObserverConfig} from '../wy-spider.type';
import {fromEvent, merge, Observable, Subscription} from 'rxjs';
import {distinctUntilChanged, filter, map, mergeAll, mergeMapTo, pluck, takeUntil, tap} from 'rxjs/operators';
import {DOCUMENT} from '@angular/common';
import {getElementOffset, SpiderEvent} from '../wy-spider.helper';
import {inArray} from '../../../utils/array';

import {limitNumberInRange,getPercent} from '../../../utils/number';



@Component({
  selector: 'app-wy-slider',
  templateUrl: './wy-slider.component.html',
  styleUrls: ['./wy-slider.component.less'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WySliderComponent implements OnInit,OnChanges {

  @ViewChild('wySlider', {static: true, read: ElementRef}) wySlider!: ElementRef;

  @Input() wyVertical = false;  //是否垂直移动
  @Input() wyMin = 0;
  @Input() wyMax = 100;


  @Input('sliderValue') sliderValue:number=0  //父组件传入的滑块值
  @Output() sliderValueChange = new EventEmitter<number>()


  private sliderDom!: HTMLDivElement;
  private dragStart$: Observable<number> = new Observable<number>();
  private dragMove$: Observable<number> = new Observable<number>();
  private dragEnd$: Observable<Event> = new Observable();
  private dragStart_: Subscription | null = null;
  private dragMove_: Subscription | null = null;
  private dragEnd_: Subscription | null = null;

  private isDragging = false;     //是否在订阅
  private value = 0;  //当前滑块所在位置
  public offset = 0;   //滑块条长度



  @Input()moveEmit = false  //滑动时要不要发送当前值


  @Input()bufferValue:number=0
  public bufferOffset = 0; //缓冲条的长度
  constructor(@Inject(DOCUMENT) private doc: Document,private cdr: ChangeDetectorRef) {

  }



  ngOnInit(): void {
  }

  ngAfterViewChecked(){
    this.sliderDom = this.wySlider?.nativeElement
    this.createDraggingObservables()
    this.subscribeDrag(['start']);
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes['sliderValue']){
      this.setValue(this.sliderValue,true)
    }
    if (changes['bufferValue']){
      this.bufferOffset = this.formatValue(this.bufferValue)
    }
  }


  //根据拖动或者的点击的位置得出进度条的长度


  //给滑块绑定事件
  private createDraggingObservables(){
    const orientField = this.wyVertical ? 'pageY' : 'pageX';



    const mouse:SliderEventObserverConfig={
      start: 'mousedown',
      move: 'mousemove',
      end: 'mouseup',
      filter:(e:Event)=>e instanceof MouseEvent,
      pluckKey:[orientField]
    };


    const touch:SliderEventObserverConfig={
      start: 'touchstart',
      move:'touchmove',
      end:'mouseup',
      filter:(e:Event)=>e instanceof TouchEvent,
      pluckKey: ['touches','0',orientField]
    };

    [mouse,touch].forEach(source=>{
      const { start, move, end, filter: filerFunc, pluckKey } = source;

      //事件绑定

      source.startPlucked$ = fromEvent(this.sliderDom,start).pipe(
          filter(filerFunc),
          tap(SpiderEvent),
          pluck(...pluckKey),
          map((position: any) =>this.fingCloseStvalue(position))
        )

      source.end$ = fromEvent(this.doc,end)

      source.moveResolved$ = fromEvent(this.doc, move).pipe(
        filter(filerFunc),
        tap(SpiderEvent),
        pluck(...pluckKey),
        distinctUntilChanged(),
        map((position:any) => this.fingCloseStvalue(position)),
        takeUntil(source.end$)
      );
    })

    // @ts-ignore
    this.dragStart$ = merge(mouse.startPlucked$,touch.startPlucked$)
    // @ts-ignore
    this.dragMove$ = merge(mouse.moveResolved$,touch.moveResolved$)
    // @ts-ignore
    this.dragEnd$ = merge(mouse.end$,touch.end$)
  }

  private onDragStart(value: number) {
    this.toggleDragMoving(true);
    this.setValue(value)
  }
  private onDragMove(value: number) {
    if (this.isDragging) {
      this.setValue(value)
      this.cdr.markForCheck();
      if (this.moveEmit){
        this.sliderValueChange.emit(this.sliderValue)
      }
    }
  }
  private onDragEnd() {
    this.sliderValueChange.emit(this.sliderValue)
    this.toggleDragMoving(false);
    this.cdr.markForCheck();
  }


  //设置value值，并更新滑块位置
  private setValue(value:number,needCheck:boolean=false){
    if (needCheck) {
      if (this.isDragging) { return; }
      this.value = this.formatValue(value);
      this.sliderValue = this.value
      this.updateTrackAndHandles();
    } else if (!this.valuesEqual(this.value, value)) {
      this.value = this.formatValue(value);
      this.sliderValue = this.value
      this.updateTrackAndHandles();
    }

  }

  //优化value值为nan的情况(nan是number类型)
  private formatValue(value: number): number {
    let res:number;
    if (isNaN(value)||value===null) {
      res = this.wyMin;
    } else {
      res = limitNumberInRange(value as number, this.wyMin, this.wyMax);
    }
    return res;
  }

  //value类型判断
  private valuesEqual(valA: number|null, valB: number|null): boolean {
    if (typeof valA !== typeof valB) {
      return false;
    }
    return valA === valB;
  }
  //更新滑块长度
  private updateTrackAndHandles(){
    this.offset = this.getValueToOffset(this.value);
  }
  private getValueToOffset(value: number): number {
    //计算百分比
    return getPercent(this.wyMin, this.wyMax, value);
  }

  //变换订阅状态
  private toggleDragMoving(movable:boolean){
    this.isDragging = movable;
    if (movable) {
      this.subscribeDrag(['move', 'end']);
    } else {
      this.unsubscribeDrag(['move', 'end']);
    }
  }

  //取消订阅
  private unsubscribeDrag(events: string[] = ['start', 'move', 'end']){
    if (inArray(events, 'start') && this.dragStart_) {
      this.dragStart_.unsubscribe();
      this.dragStart_ = null;
    }
    if (inArray(events, 'move') && this.dragMove_) {
      this.dragMove_.unsubscribe();
      this.dragMove_ = null;
    }
    if (inArray(events, 'end') && this.dragEnd_) {
      this.dragEnd_.unsubscribe();
      this.dragEnd_ = null;
    }
  }

  //订阅
  private subscribeDrag(events: string[] = ['start', 'move', 'end']) {
    if (inArray(events, 'start') && this.dragStart$ && !this.dragStart_) {
      this.dragStart_ = this.dragStart$.subscribe(value=>this.onDragStart(value));
    }
    if (inArray(events, 'move') && this.dragMove$ && !this.dragMove_) {
      this.dragMove_ = this.dragMove$.subscribe(this.onDragMove.bind(this));
    }
    if (inArray(events, 'end') && this.dragEnd$ && !this.dragEnd_) {
      this.dragEnd_ = this.dragEnd$.subscribe(this.onDragEnd.bind(this));
    }
  }

  //计算滑块长度
  private fingCloseStvalue(position:number):number{
    //获取滑块总长
    const sliderLength = this.getSliderLength()

    //滑块（左，上）位置
    const sliderStart = this.getSliderStartPosition()

    //滑块当前位置/滑块总长
    const ratio = (position - sliderStart) / sliderLength
    const ratioTrue = this.wyVertical ? 1-ratio:ratio

    return ratioTrue * (this.wyMax - this.wyMin) + this.wyMin
  }

  //获取滑块总长
  private getSliderLength():number{
    return this.wyVertical ? this.sliderDom.clientHeight:this.sliderDom.clientWidth
  }
  //滑块（左，上）位置
  private getSliderStartPosition():number{
    const offset = getElementOffset(this.sliderDom)
    return this.wyVertical?offset.top:offset.left
  }




}

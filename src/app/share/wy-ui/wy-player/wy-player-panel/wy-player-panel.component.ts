import {Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {Song} from "../../../../service/data-types/common.types";
import {WyScrollComponent} from '../wy-scroll/wy-scroll.component';

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit,OnChanges {

  @Input()songList:Song[] = []
  @Input()currentSong:Song = {
    id:0,
    name:'',
    url:'',
    ar:[],
    al:{id:0,name:'',picUrl:''},
    dt:0,
  };
  @Input()currentIndex:number=0
  @Output()currentIndexChange = new EventEmitter<number>()

  //面板是否显示
  @Input()show:boolean=false
  @Output()showChange = new EventEmitter<boolean>()

  //音乐面板容器的引用
  @ViewChildren(WyScrollComponent) private wyScroll: QueryList<WyScrollComponent> | undefined;
  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']){
      if (!changes.show.firstChange && this.show) {
        //first是指第一个组件
        this.wyScroll!.first.refreshScroll();
      }
    }
  }


  panelClose(){
    this.showChange.emit(false)
  }


  changeSong(index:number){
    this.currentIndexChange.emit(index)
  }
}

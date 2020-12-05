import {Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren} from '@angular/core';
import {Lyric, Song} from "../../../../service/data-types/common.types";
import {WyScrollComponent} from '../wy-scroll/wy-scroll.component';
import {timer} from "rxjs";
import {SongService} from "../../../../service/song.service";
import {BaseLyricLine, WyLyric} from "./wy-lyric";

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
  @ViewChildren(WyScrollComponent) private wyScroll!: QueryList<WyScrollComponent>

  //面板的高度
  scrollY = 0;

  //当前播放歌曲的歌词
  currentLyric:BaseLyricLine[] = []

  constructor(private songService:SongService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']){
      if (!changes.show.firstChange && this.show) {
        //first是指第一个组件
        this.wyScroll.first.refreshScroll();
        timer(80).subscribe(() => {
          if (this.currentSong) {
            this.scrollToCurrent(0);
          }
        })


      }
    }

    if (changes['currentSong'] && this.currentSong.id>0){
      this.getLyric(this.currentSong.id)
    }
  }

  //歌曲随着播放滚动
  private scrollToCurrent(speed = 300){
    const songListRefs = this.wyScroll.first.el.nativeElement.querySelectorAll('ul li')
    if (songListRefs){
      //选中的元素
      const currentSongRef = songListRefs[this.currentIndex]
      //选中的元素距离上方或上层控件的位置
      const offsetTop = currentSongRef.offsetTop;
      //
      const offsetHeight = currentSongRef.offsetHeight;
      if (((offsetTop - Math.abs(this.scrollY)) > offsetHeight * 5) || (offsetTop < Math.abs(this.scrollY))) {
        this.wyScroll.first.scrollToElement(currentSongRef, speed, false, false);
      }
    }
  }



  panelClose(){
    this.showChange.emit(false)
  }


  changeSong(index:number){
    this.currentIndexChange.emit(index)
  }

  //获取歌词
  getLyric(id:number){
    id = 1457707546
     this.songService.getLyric(id).subscribe(lyric=>{
      let wylyric = new WyLyric(lyric)
       this.currentLyric = wylyric.lines
    })
  }
}

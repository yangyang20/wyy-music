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

  //当前高亮的歌词行
  currentLineNum:number=0
  //间隔几行开始滚动
  private startLine = 2;
  //当前播放时间
  @Input()currentTime:number=0
  //删除歌曲
  @Output()onDeleteSong = new EventEmitter<number>()
  @Output()OnClearSong = new EventEmitter<void>()


  private wylyric!:WyLyric

  constructor(private songService:SongService) { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['show']){
      if (!changes.show.firstChange && this.show) {
        //first是指第一个组件
        this.wyScroll.first.refreshScroll();
        this.wyScroll.last.refreshScroll();
        timer(80).subscribe(() => {
          if (this.currentSong) {
            this.scrollToCurrent(0);
          }
        })
      }
    }

    if (changes['currentTime']){
      if (this.show){
          this.scrollToLyric(300);
      }
    }

    if (changes['currentSong'] && this.currentSong.id>0){
      this.wyScroll.last.refreshScroll();
      this.getLyric(this.currentSong.id)
      this.wyScroll.last.scrollTo(0, 0);
    }
  }

  //歌曲随着播放滚动
  private scrollToCurrent(speed = 300){
    const songListRefs = this.wyScroll.first.el.nativeElement.querySelectorAll('ul li')
    if (songListRefs){
      //选中的元素
      const currentSongRef = songListRefs[this.currentIndex]
      //选中的元素距离上方或上层控件的位置
      const offsetTop = currentSongRef?.offsetTop;
      //
      const offsetHeight = currentSongRef?.offsetHeight;
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
    // id = 1457707546
     this.songService.getLyric(id).subscribe(lyric=>{
       this.wylyric = new WyLyric(lyric)
       this.currentLyric = this.wylyric.lines
       if (this.wylyric.lrc.tlyric){
         this.startLine=1
       }
    })

  }

  //歌词随着时间滚动
  private scrollToLyric(speed:number=300){
    const time = this.currentTime * 1000
    this.currentLineNum = this.wylyric.findCurNum(time)-1
    const songListRefs = this.wyScroll.last.el.nativeElement.querySelectorAll('ul li')
    if (songListRefs && this.currentLineNum){
      const currentLyricLine = songListRefs[this.currentLineNum-this.startLine]
      if (currentLyricLine){
        this.wyScroll.last.scrollToElement(currentLyricLine,speed,false,false)
      }
    }
  }


  //删除歌曲
  deleteSong(songIndex:number){
    this.onDeleteSong.emit(songIndex)
  }
  //清空歌曲
  clearSongList(){
    this.OnClearSong.emit()
  }
}

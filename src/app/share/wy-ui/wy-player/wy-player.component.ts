import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppStoreModule} from '../../../store';
import {getCurrentIndex, getCurrentSong, getPlayList, getPlayMode, getSongList} from '../../../store/selectors/player.selectors';
import {Song} from "../../../service/data-types/common.types";
import {PlayMode} from "./player.type";
import {SetCurrentIndex} from '../../../store/actions/player.actions';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {

  songList:Song[]=[]
  playList:Song[]=[]
  currentIndex:number=-1
  currentSong:Song = {
    id:0,
    name:'',
    url:'',
    ar:[],
    al:{id:0,name:'',picUrl:''},
    dt:0,
  }
  playMode:PlayMode|undefined

  currentTime: number=0; //当前歌曲播放时长
  duration: number = 0; //当前歌曲时长


  playing:boolean = false //是否正在播放

  songReady:boolean = false;  //是否可以播放

  @ViewChild('audit',{static:true,read:ElementRef})private audit: ElementRef | undefined
  private auditEl:HTMLAudioElement|undefined

  constructor(private store$:Store<AppStoreModule>) {
    // @ts-ignore
    const appStore$ = this.store$.pipe(select('player'));

    const stateArr = [
      {
        type:getSongList,
        cb:(list:Song[])=>this.watchList(list,'songList')
      },
      {
        type:getPlayList,
        cb:(list:Song[])=>this.watchList(list,'playList')
      },
      {
        type:getCurrentIndex,
        cb:(currentIndex:number)=>this.watchCurrentIndex(currentIndex)
      },
      {
        type:getPlayMode,
        cb:(mode:PlayMode)=>this.watchPlayMode(mode)
      },
      {
        type:getCurrentSong,
        cb:(song:Song)=>this.watchCurrentSong(song)
      },
    ]

    stateArr.forEach(item=>{
      // @ts-ignore
      appStore$.pipe(select(item.type)).subscribe(item.cb);
    })
  }

  //音量控制是否显示
  showVolumnPanel:boolean = false
  //音量
  volume:number = 50
  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.auditEl = this.audit?.nativeElement
  }

  private watchList(list:Song[],type:string){
    // @ts-ignore
    this[type] = list
  }

  private watchCurrentIndex(currentIndex:number){
    this.currentIndex = currentIndex
  }


  private watchPlayMode(playMode:PlayMode){
    this.playMode = playMode
  }

  private watchCurrentSong(song:Song){
    if (song){
      this.duration =song.dt
      this.currentSong = song
    }
  }


  onPlay(){
    this.play()
    this.songReady=true
  }

  private play(){
    this.auditEl!.play()
    this.playing = true
  }

  getPic(){
    return this.currentIndex>=0 ? this.currentSong.al.picUrl :'//s4.music.126.net/style/web2/img/default/default_album.jpg'
  }

  onTimeUpdate(event:HTMLAudioElement){
    this.currentTime = event.currentTime * 1000
  }

  //切换播放暂停
  onToggle(){
    if (this.songReady){
      this.playing = !this.playing
      if (this.playing){
        this.auditEl?.play()
      }else {
        this.auditEl?.pause()
      }
    }else if (this.playList.length){
      this.updateIndex(0)
    }

  }

  //上一曲
  prev(index:number){
    if (this.songList.length && this.songReady){
      let songIndex = index <0?this.songList.length-1:index
      this.updateIndex(songIndex)
    }
  }

  //下一曲
  next(index:number){
    if (this.songList.length && this.songReady){
      let songIndex = index >=this.songList.length?0:index
      this.updateIndex(songIndex)
    }
  }

  //更新播放索引
  private updateIndex(index: number) {
    if (index<0){
      index = 0
    }
    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    this.songReady = false;
  }



  toggleVolPanel(){
    this.showVolumnPanel = !this.showVolumnPanel
  }
}

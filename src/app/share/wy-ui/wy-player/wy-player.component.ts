import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppStoreModule} from '../../../store';
import {
  getCurrentIndex,
  getCurrentSong,
  getPlayer,
  getPlayList,
  getPlayMode,
  getSongList
} from '../../../store/selectors/player.selectors';
import {Song} from "../../../service/data-types/common.types";
import {PlayMode} from "./player.type";
import {SetCurrentIndex, SetPlayList, SetPlayMode, SetSongList} from '../../../store/actions/player.actions';
import {findIndex, shuffle} from "../../../utils/array";
import {BatchActionsService} from '../../../store/batch-actions.service';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzModalModule, NzModalService} from 'ng-zorro-antd/modal';
import {animate, state, style, transition, trigger} from "@angular/animations";


const modeTypes: PlayMode[] = [{
  type: 'loop',
  label: '循环'
}, {
  type: 'random',
  label: '随机'
}, {
  type: 'singleLoop',
  label: '单曲循环'
}];


enum TipTitles {
  Add = '已添加到列表',
  Play = '已开始播放'
}




@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less'],
  animations:[trigger('showHide',[
    state('show',style({bottom:0})),
    state('hide',style({bottom:-65})),
    transition('show=>hide',[animate('0.3s')]),
    transition('hide=>show',[animate('0.1s')]),
  ])]
})
export class WyPlayerComponent implements OnInit {

  //todo 拖动播放不顺畅

  //控制播放器的显示与隐藏
  playerShow = 'hide'
  //播放器锁定
  isLocked=false
  // 是否正在动画
  animating = false;

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

  currentTime: number=0; //当前歌曲播放时长
  duration: number = 0; //当前歌曲时间


  playing:boolean = false //是否正在播放
  songReady:boolean = false;  //是否可以播放

  //当前播放模式
  playMode:PlayMode = {
    type:'loop',
    label:'循环'
  }
  //播放模式的变换次数
  modeCount:number=0


  //


  @ViewChild('audio',{static:true,read:ElementRef})private audio: ElementRef | undefined
  private audioEl:HTMLAudioElement|undefined

  constructor(private store$:Store<AppStoreModule>,
              private batchActionsServe: BatchActionsService,
              private nzModelService:NzModalService) {


    const appStore$ = this.store$.pipe(select(getPlayer));


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
  //音量是0~1之前
  volume:number = 0.3
  //音量转换为滑块的值
  volumeValue:number = this.volume*100

  //设置播放进度条的位置
  percent:number=0

  //当前歌曲的缓冲条的位置
  bufferPercent:number=0

  //歌曲播放面板是否显示
  panelShow:boolean = false

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.audioEl = this.audio?.nativeElement
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
    //模式改变要改变的歌曲的播放顺序
    if (this.songList){
      let list = this.songList.slice()
      if (playMode.type == 'random'){
        list = shuffle(this.songList);
        this.store$.dispatch(SetPlayList({playList:list}))
        let newIndex = findIndex(list,this.currentSong)
        this.updateIndex(newIndex)
      }
    }


  }

  private watchCurrentSong(song:Song){
    if (song){
      this.duration =song.dt/1000
      this.currentSong = song
    }
  }


  onPlay(){
    this.play()
    this.songReady=true
  }

  private play(){
    this.audioEl!.play()
    this.playing = true
  }

  //歌曲图片
  getPic(){
    return this.currentIndex>=0 ? this.currentSong.al.picUrl :'//s4.music.126.net/style/web2/img/default/default_album.jpg'
  }

  //播放时间更新
  onTimeUpdate(event:HTMLAudioElement){
    this.currentTime = event.currentTime
    //播放时间是毫秒计数,播放时长是不固定的，滑块总长是固定的
    this.percent = (this.currentTime / this.duration) * 100;
    if (this.audioEl){
      const buffered = this.audioEl.buffered;
      if (buffered.length && this.bufferPercent < 100) {
        this.bufferPercent = (buffered.end(0) / this.duration) * 100;
      }
    }

  }

  //切换播放暂停
  onToggle(){
    if (this.songReady){
      this.playing = !this.playing
      if (this.playing){
        this.audioEl?.play()
      }else {
        this.audioEl?.pause()
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
  public updateIndex(index: number) {
    if (index<0){
      index = 0
    }

    this.store$.dispatch(SetCurrentIndex({ currentIndex: index }));
    // this.songReady = false;
  }


  //动态改变歌曲播放位置
  percentChange(value:number){
    const currentTime = this.duration * (value / 100);
    if (this.currentSong){
      this.audioEl!.currentTime = currentTime
      // console.log('当前播放时间',this.audioEl!.currentTime);
    }
  }

  //控制音量大小
  volumeChane(per:number){
    this.volume = per/100
  }

  //控制音量面板是否显示
  toggleVolPanel(){
    this.showVolumnPanel = !this.showVolumnPanel
  }

  //改变当前播放模式
  changeMode(){
    this.store$.dispatch(SetPlayMode({ playMode: modeTypes[++this.modeCount % 3] }));
  }

  //播放结束
  onEnded(){
    this.playing = false;
    if (this.playMode.type === 'singleLoop') {
      this.loop();
    } else {
      this.next(this.currentIndex + 1);
    }
  }

  //单曲循环
  private loop(){
    this.audioEl!.currentTime=0
    this.audioEl?.play()
  }

  //切换播放面板的显示与隐藏
  togglePanel(){
    this.panelShow = !this.panelShow
  }

  //删除歌曲
  deleteSong(songIndex:number){
    this.batchActionsServe.deleteSong(songIndex)
  }

  //清空歌曲
  clearSongList(){
    this.nzModelService.confirm({
      nzTitle:'确认清空列表吗?',
      nzOnOk:()=>{
        this.batchActionsServe.clearSongList()
      }
    })

  }

  //切换播放器的显示与隐藏
  togglePlayer(type:'hide'|'show'){
    if (!this.isLocked && !this.animating){
      this.playerShow = type
    }
  }


}

import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Creator, Singer, Song, SongSheet} from "../../service/data-types/common.types";
import {SheetService} from "../../service/sheet.service";
import {AppStoreModule} from "../../store";
import {select, Store} from "@ngrx/store";

import {Subject} from "rxjs";
import {getCurrentSong, getPlayer} from "../../store/selectors/player.selectors";
import {takeUntil} from "rxjs/operators";
import {findIndex} from "../../utils/array";
import {SongService} from "../../service/song.service";
import {BatchActionsService} from "../../store/batch-actions.service";

@Component({
  selector: 'app-sheet-info',
  templateUrl: './sheet-info.component.html',
  styleUrls: ['./sheet-info.component.less']
})
export class SheetInfoComponent implements OnInit,OnDestroy {

  description = {
    short: '',
    long: ''
  };

  controlDesc = {
    isExpand: false,
    label: '展开',
    iconCls: 'down'
  };

  sheetInfo:SongSheet = {
    id:0,
    name:'',
    picUrl:'',
    playCount:0,
    tracks:[],
    coverImgUrl:'',
    creator:{avatarUrl:'', nickname:'string'},
    createTime:0,
    subscribedCount:0,
    shareCount:0,
    tags:[],
    userId:0,
    subscribed:false,
    description:''
  }

  sheetId:number = 0

  currentIndex:number=-1

  currentSong:Song={
    id:0,
    name:'',
    url:'',
    ar:[],
    al:{id:0,name:'',picUrl:''},
    dt:0,
  }

  //取消订阅
  private destroy$ = new Subject<void>();

  constructor(private activateRoute:ActivatedRoute,
              private sheetService:SheetService,
              private store$:Store<AppStoreModule>,
              private songService:SongService,
              private batchActionServe:BatchActionsService) {


  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.sheetId = params.id
      this.getSheetInfo(this.sheetId)
      this.listenCurrent()
    })
  }

  private getSheetInfo(id:number){
    this.sheetService.getSongSheetDetail(id).subscribe(songSheet=>{
      this.sheetInfo = songSheet
      if (songSheet.description) {
        this.changeDesc(songSheet.description);
      }
    })
  }


  onAddSong(song:Song,isPlay:boolean=false){
    this.songService.getSongList(song).subscribe(list=>{
      if (list.length) {
        this.batchActionServe.insertSong(list[0], isPlay);
      } else {

      }
    })
  }

  onAddSongs(songs:Song[],isPlay:boolean=false){
    this.songService.getSongList(songs).subscribe(list=>{
      if (list.length){
        if (isPlay){
          this.batchActionServe.selectPlayList({list,index:0})
        } else{
        this.batchActionServe.insertSongs(list)
        }
      }
    })
  }


  private listenCurrent() {
    //`takeUntil` 订阅并开始镜像源 Observable 。它还监视另外一个 Observable，即你
    //  * 提供的 `notifier` 。如果 `notifier` 发出值或 `complete` 通知，那么输出 Observable
    //  * 停止镜像源 Observable ，然后完成。
    this.store$
      .pipe(select(getPlayer), select(getCurrentSong), takeUntil(this.destroy$))
      .subscribe(song => {
        this.currentSong = song;
        if (song) {
          this.currentIndex = findIndex(this.sheetInfo.tracks, song);
        } else {
          this.currentIndex = -1;
        }
      });
  }

  toggleDesc() {
    this.controlDesc.isExpand = !this.controlDesc.isExpand;
    if (this.controlDesc.isExpand) {
      this.controlDesc.label = '收起';
      this.controlDesc.iconCls = 'up';
    } else {
      this.controlDesc.label = '展开';
      this.controlDesc.iconCls = 'down';
    }
  }

  private changeDesc(desc: string) {
    if (desc.length < 99) {
      this.description = {
        short: this.replaceBr('<b>介绍：</b>' + desc),
        long: ''
      };
    } else {
      this.description = {
        short: this.replaceBr('<b>介绍：</b>' + desc.slice(0, 99)) + '...',
        long: this.replaceBr('<b>介绍：</b>' + desc)
      };
    }
  }

  private replaceBr(str: string): string {
    return str.replace(/\n/g, '<br />');
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

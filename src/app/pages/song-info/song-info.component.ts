import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Singer, Song} from "../../service/data-types/common.types";
import {SongService} from "../../service/song.service";
import {BaseLyricLine, WyLyric} from "../../share/wy-ui/wy-player/wy-player-panel/wy-lyric";
import {map, takeUntil} from "rxjs/operators";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../store";
import {getCurrentSong, getPlayer} from "../../store/selectors/player.selectors";
import {Subject} from "rxjs";
import {BatchActionsService} from "../../store/batch-actions.service";

@Component({
  selector: 'app-song-info',
  templateUrl: './song-info.component.html',
  styleUrls: ['./song-info.component.less']
})
export class SongInfoComponent implements OnInit {

  lyric:BaseLyricLine[] = []

  songId:number=0

  song:Song = {
    id:0,
    name:'',
    url:'',
    ar:[],
    al:{id:0,name:'',picUrl:''},
    dt:0,
  }

  controlLyric = {
    isExpand: false,
    label: '展开',
    iconCls: 'down'
  };

  currentSong:Song|undefined

  private destroy$ = new Subject<void>()

  constructor(private activateRoute:ActivatedRoute,
              private songService:SongService,
              private store$:Store<AppStoreModule>,
              private batchActionsService:BatchActionsService) {
    const id = this.activateRoute.snapshot.paramMap.get('id')
    this.songId=Number(id)
  }

  ngOnInit(): void {
    this.getSongDetail(this.songId)
    this.getSongLyric(this.songId)
    this.listenCurrent();
  }


  onAddSong(song:Song,isPlay:boolean=false){
    if (song.id !== this.currentSong?.id){
      this.songService.getSongList(song).subscribe(list=>{
          if (list.length){
            this.batchActionsService.insertSong(list[0],isPlay)
          }
      })

    }
  }

  private getSongDetail(id:number){
      this.songService.getSongDetails(String(id)).subscribe(song=>{
        this.song = song[0]
      })
  }

  private getSongLyric(id:number){
    this.songService.getLyric(id).subscribe(lyric=>{
      this.lyric = new WyLyric(lyric).lines
    })
  }

  private listenCurrent(){
    this.store$.pipe(select(getPlayer),select(getCurrentSong),takeUntil(this.destroy$)).subscribe(song=>{
      this.currentSong = song
    })
  }

  toggleLyric() {
    this.controlLyric.isExpand = !this.controlLyric.isExpand;
    if (this.controlLyric.isExpand) {
      this.controlLyric.label = '收起';
      this.controlLyric.iconCls = 'up';
    } else {
      this.controlLyric.label = '展开';
      this.controlLyric.iconCls = 'down';
    }
  }
}

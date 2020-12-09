import { Injectable } from '@angular/core';
import {AppStoreModule} from './index';
import {PlayState} from './reducers/player.reducer';
import {SetCurrentIndex, SetPlayList, SetSongList} from './actions/player.actions';
import {select, Store} from '@ngrx/store';
import {getPlayer} from './selectors/player.selectors';
import {Song} from "../service/data-types/common.types";
import {findIndex} from "../utils/array";

@Injectable({
  providedIn: AppStoreModule
})
export class BatchActionsService {
  private playerState!:PlayState
  constructor(private store$: Store<AppStoreModule>) {
    this.store$.pipe(select(getPlayer)).subscribe(res => this.playerState = res);
  }



  //删除歌曲
  deleteSong(songIndex:number){
    let currentIndex = this.playerState.currentIndex
    if (currentIndex>songIndex){
      currentIndex--
    }
    let songList = this.playerState.songList.slice()
    let playList = this.playerState.playList.slice()
    songList.splice(songIndex,1)
    playList.splice(songIndex,1)
    this.store$.dispatch(SetSongList({songList}))
    this.store$.dispatch(SetPlayList({playList}))
    this.store$.dispatch(SetCurrentIndex({currentIndex}))
  }

  //清空歌曲
  clearSongList(){
    this.store$.dispatch(SetSongList({songList:[]}))
    this.store$.dispatch(SetPlayList({playList:[]}))
    this.store$.dispatch(SetCurrentIndex({currentIndex:-1}))
  }

  //插入歌曲
  insertSongs(song:Song,play:boolean=false){
    let currentIndex = this.playerState.currentIndex
    let songList = this.playerState.songList.slice()
    let playList = this.playerState.playList.slice()
    let insetIndex = findIndex(playList,song)

    if (insetIndex){
      if (play){
        currentIndex = insetIndex
      }
    }else{
      songList.push(song)
      playList.push(song)
      if (play){
        currentIndex = playList.length-1
      }
    }
    this.store$.dispatch(SetPlayList({playList}))
    this.store$.dispatch(SetSongList({songList}))
    if (currentIndex !==this.playerState.currentIndex){
      this.store$.dispatch(SetCurrentIndex({currentIndex}))
    }
  }
}

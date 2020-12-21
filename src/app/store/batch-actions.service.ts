import {Injectable} from '@angular/core';
import {AppStoreModule} from './index';
import {CurrentActions, PlayState} from './reducers/player.reducer';
import {SetCurrentAction, SetCurrentIndex, SetPlayList, SetSongList} from './actions/player.actions';
import {select, Store} from '@ngrx/store';
import {getPlayer} from './selectors/player.selectors';
import {Song} from "../service/data-types/common.types";
import {findIndex, shuffle} from '../utils/array';
import {MemberState, ModalTypes} from "./reducers/member.reducer";
import {getMember} from "./selectors/member.selectors";
import {SetModalType, SetModalVisible} from "./actions/member.action";

@Injectable({
  providedIn: AppStoreModule
})
export class BatchActionsService {
  private playerState!:PlayState
  private memberState!:MemberState
  constructor(private store$: Store<AppStoreModule>) {
    this.store$.pipe(select(getPlayer)).subscribe(res => this.playerState = res);
    this.store$.pipe(select(getMember)).subscribe(res=>this.memberState = res)
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
    this.store$.dispatch(SetCurrentAction({currentAction:CurrentActions.Delete}))
  }

  //清空歌曲
  clearSongList(){
    this.store$.dispatch(SetSongList({songList:[]}))
    this.store$.dispatch(SetPlayList({playList:[]}))
    this.store$.dispatch(SetCurrentIndex({currentIndex:-1}))
    this.store$.dispatch(SetCurrentAction({currentAction:CurrentActions.Clear}))
  }

  //插入歌曲
  insertSong(song:Song,play:boolean=false){
    let currentIndex = this.playerState.currentIndex
    let songList = this.playerState.songList.slice()
    let playList = this.playerState.playList.slice()
    let insetIndex = findIndex(playList,song)
    if (insetIndex>-1){
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
      this.store$.dispatch(SetCurrentAction({currentAction:CurrentActions.Play}))
    }else{
      this.store$.dispatch(SetCurrentAction({currentAction:CurrentActions.Add}))
    }

  }


  //插入多首歌曲
  insertSongs(song:Song[]){
    let songList = this.playerState.songList.slice()
    let playList = this.playerState.playList.slice()
    let validSongs = song.filter(item=>findIndex(playList,item)===-1)
    if (validSongs){
      songList = songList.concat(validSongs)
      let songPlayList = songList.slice()
      if (this.playerState.playMode.type === 'random') {
        songPlayList = shuffle(songList);
      }
      playList = playList.concat(songPlayList);
      this.store$.dispatch(SetSongList({ songList }));
      this.store$.dispatch(SetPlayList({ playList }));
      this.store$.dispatch(SetCurrentAction({currentAction:CurrentActions.Add}))
    }
  }


  // 播放列表
  selectPlayList({ list, index }: { list: Song[], index: number }) {
    this.store$.dispatch(SetSongList({ songList: list }));
    let trueIndex = index;
    let trueList = list.slice();
    if (this.playerState.playMode.type === 'random') {
      trueList = shuffle(list || []);
      trueIndex = findIndex(trueList, list[trueIndex]);
    }
    this.store$.dispatch(SetPlayList({ playList: trueList }));
    this.store$.dispatch(SetCurrentIndex({ currentIndex: trueIndex }));
    this.store$.dispatch(SetCurrentAction({currentAction:CurrentActions.Play}))
  }



  controlModal(modalVisible:boolean=true,modalType:ModalTypes= ModalTypes.Default){
    this.store$.dispatch(SetModalType({modalType}))
    this.store$.dispatch(SetModalVisible({modalVisible}))
  }
}

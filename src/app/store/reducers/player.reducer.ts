import {PlayMode} from '../../share/wy-ui/wy-player/player.type';
import {Song} from '../../service/data-types/common.types';
import {Action, createReducer, on} from '@ngrx/store';
import {
  SetCurrentAction,
  SetCurrentIndex,
  SetPlaying,
  SetPlayList,
  SetPlayMode,
  SetSongList
} from '../actions/player.actions';


export enum CurrentActions {
  Add,
  Play,
  Delete,
  Clear,
  Other
}


export interface PlayState {
  //播放状态
  playing:boolean,

  //播放模式
  playMode:PlayMode,

  //歌曲列表
  songList:Song[],

  //播放列表
  playList:Song[],

  //当前正在播放的索引
  currentIndex:number,

  //当前正在操作的行为
  currentAction:CurrentActions,
}

export const initialState:PlayState = {
  playing:false,
  playMode:{type:'loop',label:'循环'},
  songList:[],
  playList:[],
  currentIndex:-1,
  currentAction:CurrentActions.Other
}


const  reducer = createReducer(
  initialState,
  on(SetPlaying,(state, { playing}) => ({...state,playing})),
  on(SetPlayList,(state, {playList}) => ({...state,playList})),
  on(SetSongList,(state, {songList}) => ({...state,songList})),
  on(SetPlayMode,(state,{playMode}) =>({...state,playMode})),
  on(SetCurrentIndex,(state, {currentIndex}) =>({...state,currentIndex})),
  on(SetCurrentAction,(state, {currentAction}) =>({...state,currentAction})),
)


export function playerReducer(state:PlayState,action:Action){
  return reducer(state,action)
}

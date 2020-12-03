import {createAction, props} from '@ngrx/store';
import {Song} from '../../service/data-types/common.types';
import {PlayMode} from '../../share/wy-ui/wy-player/player.type';

export const SetPlaying = createAction('[player] Set playing', props<{playing:boolean}>())
export const SetPlayList = createAction('[player] Set PlayList',props<{playList:Song[]}>())
export const SetSongList = createAction('[player] Set SongList',props<{songList:Song[]}>())
export const SetPlayMode = createAction('[player] Set PlayMode',props<{playMode:PlayMode}>())
export const SetCurrentIndex = createAction('[player] Set currentIndex',props<{currentIndex:number}>())

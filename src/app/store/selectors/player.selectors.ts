import {PlayState} from '../reducers/player.reducer';
import {createSelector} from '@ngrx/store';

const selectPlayerStates = (status:PlayState)=>status

export const getPlaying = createSelector(selectPlayerStates,(status:PlayState)=>status.playing)
export const getPlayList = createSelector(selectPlayerStates,(status:PlayState)=>status.playList)
export const getSongList = createSelector(selectPlayerStates,(status:PlayState)=>status.songList)
export const getPlayMode = createSelector(selectPlayerStates,(status:PlayState)=>status.playMode)
export const getCurrentIndex = createSelector(selectPlayerStates,(status:PlayState)=>status.currentIndex)

export const getCurrentSong = createSelector(selectPlayerStates,({playList,currentIndex}:PlayState)=>playList[currentIndex])

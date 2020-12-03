import { Component, OnInit } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {AppStoreModule} from '../../../store';
import {getCurrentIndex, getCurrentSong, getPlayList, getPlayMode, getSongList} from '../../../store/selectors/player.selectors';
import {PlayState} from '../../../store/reducers/player.reducer';

@Component({
  selector: 'app-wy-player',
  templateUrl: './wy-player.component.html',
  styleUrls: ['./wy-player.component.less']
})
export class WyPlayerComponent implements OnInit {

  constructor(private store$:Store<AppStoreModule>) {
    // @ts-ignore
    const appStore$ = this.store$.pipe(select('player'));
    // @ts-ignore
    appStore$.pipe(select(getSongList)).subscribe(list => console.log(list, 'songList'));
    // @ts-ignore
    appStore$.pipe(select(getPlayList)).subscribe(list => console.log(list, 'playList'));
    // @ts-ignore
    appStore$.pipe(select(getCurrentIndex)).subscribe(index => console.log(index));
    // @ts-ignore
    appStore$.pipe(select(getPlayMode)).subscribe(mode=> console.log(mode));

    // appStore$.pipe(select(getCurrentSong)).subscribe((song: PlayState)=> console.log(song));

  }

  //音量控制是否显示
  showVolumnPanel:boolean = false
  //音量
  volume:number = 50
  ngOnInit(): void {
  }




  toggleVolPanel(){
    this.showVolumnPanel = !this.showVolumnPanel
  }
}

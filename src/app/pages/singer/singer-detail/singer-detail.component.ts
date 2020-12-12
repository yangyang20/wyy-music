import {Component, OnDestroy, OnInit} from '@angular/core';
import {Singer, SingerDetail, Song} from '../../../service/data-types/common.types';
import {ActivatedRoute} from '@angular/router';
import {select, Store} from '@ngrx/store';
import {AppStoreModule} from '../../../store';
import {BatchActionsService} from '../../../store/batch-actions.service';
import {Subject} from 'rxjs';
import {getCurrentSong, getPlayer} from '../../../store/selectors/player.selectors';
import {takeUntil} from 'rxjs/operators';
import {SongService} from '../../../service/song.service';
import {SingerService} from '../../../service/singer.service';
import {findIndex} from '../../../utils/array';

@Component({
  selector: 'app-singer-detail',
  templateUrl: './singer-detail.component.html',
  styleUrls: ['./singer-detail.component.less']
})
export class SingerDetailComponent implements OnInit,OnDestroy {

  singerId:number=0

  singerDetail:SingerDetail= {
    artist: {
      id:0,
      name:'',
      picUrl:'',
      albumSize:0,
      alias:[]
    },
    hotSongs: [],
  }
  //相似歌手
  simiSingers:Singer[]=[]

  private currentSong:Song|undefined

  currentIndex=0

  private destroy$ = new Subject<void>()


  constructor(private activateRoute:ActivatedRoute,
              private store$:Store<AppStoreModule>,
              private batchActionsService:BatchActionsService,
              private songService:SongService,
              private singerService:SingerService) {
  }

  ngOnInit(): void {
    this.activateRoute.params.subscribe(params=>{
      this.singerId = params.id
      this.getSingerDetail()
      this.getSingerSimi()
      this.listenCurrent()
    })

  }


  private listenCurrent(){
    this.store$.pipe(select(getPlayer),select(getCurrentSong),takeUntil(this.destroy$)).subscribe(song=>{
      this.currentSong = song
      if (song) {
        this.currentIndex = findIndex(this.singerDetail.hotSongs, song);
      } else {
        this.currentIndex = -1;
      }
    })
  }


  private getSingerDetail(){
    this.singerService.getSingerDetail(this.singerId).subscribe(singerDetail=>{
      this.singerDetail = singerDetail
    })
  }

  private getSingerSimi(){
    this.singerService.getSingerSimi(this.singerId).subscribe(singers=>{
      this.simiSingers = singers
    })
  }

  onAddSongs(song:Song[], isPlay:boolean=false){

    this.songService.getSongList(song).subscribe(list=>{
      if (list.length) {
        if (isPlay) {
          this.batchActionsService.selectPlayList({list,index:0})
        } else {
          this.batchActionsService.insertSongs(list)
        }
      }
    })

  }

  onAddSong(song:Song, isPlay:boolean=false){
    if (song.id !==this.currentSong?.id){
      this.songService.getSongList(song).subscribe(list=>{
        if (list.length){
          this.batchActionsService.insertSong(list[0],isPlay)
        }
      })
    }
  }

  ngOnDestroy(): void {
    this.destroy$.complete()
  }
}

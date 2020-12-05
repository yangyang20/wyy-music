import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_CONFIG} from './service.module';
import {map} from 'rxjs/operators';
import {observable, Observable} from 'rxjs';
import {Lyric, Song, SongUrl} from './data-types/common.types';
import {WyLyricOriginal} from "../share/wy-ui/wy-player/wy-player-panel/wy-lyric";

@Injectable({
  providedIn: 'root'
})
export class SongService {

  constructor(private http:HttpClient,@Inject(API_CONFIG)private url:string) { }

  //获取歌曲播放url,多个id以,隔开
  getSongUrl(ids:string):Observable<SongUrl[]>{
    const params = {params:new HttpParams().set('id',ids)}

    return this.http.get(this.url+'song/url',params)
      // @ts-ignore
      .pipe(map((res:{data:SongUrl[]}) => res.data))
  }

  //获取歌曲列表
  getSongList(song:Song|Song[]):Observable<Song[]>{
    const songArr = Array.isArray(song)?song.slice():[song]
    const songids = songArr.map(item=>item.id).join(',')
    // return new Observable((observer) => {
    //   this.getSongUrl(songids).subscribe(urls => {
    //     observer.next(this.generateSongList(songArr, urls))
    //   })
    // })
    return this.getSongUrl(songids).pipe(map(urls=>this.generateSongList(songArr,urls)))
  }


  private generateSongList(songs:Song[],urls:SongUrl[]):Song[]{
    const resurt:Song[] = []
    songs.forEach(song=>{
      // @ts-ignore
      const url = urls.find(url=>url.id === song.id).url
      if (url){
        resurt.push({...song,url})
      }
    })

    return resurt
  }

  getLyric(id:number):Observable<Lyric>{
    const params = {params:new HttpParams().set('id',id.toString())}
    return this.http.get<WyLyricOriginal>(this.url + 'lyric',params).
    pipe(map((res:WyLyricOriginal)=>{
      if (res.lrc){
        return {
          lyric: res.lrc.lyric,
          tlyric: res.tlyric.lyric,
        };
      }else {
        console.log(id);
        return {
          lyric: '',
          tlyric: '',
        };
      }
    }))
  }


}

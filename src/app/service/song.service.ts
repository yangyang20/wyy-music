import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_CONFIG} from './service.module';
import {map} from 'rxjs/operators';
import {observable, Observable} from 'rxjs';
import {Song, SongUrl} from './data-types/common.types';

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
}

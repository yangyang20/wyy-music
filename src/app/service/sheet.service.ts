import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from './service.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, pluck, switchMap} from 'rxjs/operators';
import {SongSheet} from './data-types/common.types';
import {SongService} from './song.service';

@Injectable({
  providedIn: ServiceModule
})
export class SheetService {

  constructor(private http:HttpClient,@Inject(API_CONFIG)private url:string,private songService:SongService) { }

  getSongSheetDetail(id:number):Observable<SongSheet>{
    const params = {params:new HttpParams().set('id',String(id))}
    return this.http.get(this.url+'playlist/detail',params)
      // @ts-ignore
        .pipe(map((res:{playlist:SongSheet}) => res.playlist))
  }

  playSheet(songSheetId:number){
    return this.getSongSheetDetail(songSheetId)
      .pipe(pluck('tracks'),switchMap(track=>this.songService.getSongList(track)))
  }
}

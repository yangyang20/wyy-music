import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from './service.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map, pluck, switchMap} from 'rxjs/operators';
import {SheetList, SheetParams, SongSheet} from './data-types/common.types';
import {SongService} from './song.service';

@Injectable({
  providedIn: ServiceModule
})
export class SheetService {

  constructor(private http:HttpClient,@Inject(API_CONFIG)private url:string,private songService:SongService) { }

  getSongSheetDetail(id:number):Observable<SongSheet>{
    const params = {params:new HttpParams().set('id',String(id))}
    return this.http.get<{playlist:SongSheet}>(this.url+'playlist/detail',params)
        .pipe(map((res:{playlist:SongSheet}) => res.playlist))
  }

  playSheet(songSheetId:number){
    return this.getSongSheetDetail(songSheetId)
      .pipe(pluck('tracks'),switchMap(track=>this.songService.getSongList(track)))
  }

  getSheets(args:SheetParams):Observable<SheetList>{
    return this.http.post(this.url+'top/playlist',args).pipe(map(res=>res as SheetList))
  }

}

import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from './service.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Singer, SingerDetail} from './data-types/common.types';
import {map} from 'rxjs/operators';

export interface SingerParams{
  limit:number,
  offset:number,
  cat?:string,  //歌手类型
}

const defaultParams:SingerParams ={
  limit:9,
  offset:0,
  cat:'5001'
}

@Injectable({
  providedIn: ServiceModule
})
export class SingerService {

  constructor(private http:HttpClient,@Inject(API_CONFIG) private url:string) { }

  //获取歌手列表
  getEnterSinger(args:SingerParams=defaultParams):Observable<Singer[]>{
    return this.http.post<{artists:Singer[]}>(this.url+'artist/list',args).pipe(
      map((res:{artists:Singer[]}) => res.artists)
    )
  }
  //获取歌手详情
  getSingerDetail(id:number):Observable<SingerDetail>{
    const params = {params:new HttpParams().set('id',String(id))}
    return this.http.get(this.url+'artists',params).pipe(
      map(res=>res as SingerDetail)
    )
  }

  //获取相似歌手
  getSingerSimi(id:number):Observable<Singer[]>{
    const params = {params: new HttpParams().set('id',String(id))}
    return this.http.get<{artists:Singer[]}>(this.url+'simi/artist',params).pipe(
      map((res:{artists:Singer[]})=>res.artists)
    )
  }
}

import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from './service.module';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Singer} from './data-types/common.types';
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

  getEnterSinger(args:SingerParams=defaultParams):Observable<Singer[]>{

    const params =
      { params: new HttpParams()
          .set('offset', String(args.offset))
          .set('limit', String(args.limit))
          // @ts-ignore
          .set('cat', args.cat)
      }

    // @ts-ignore
    return this.http.get(this.url+'artist/list',params).pipe(
      // @ts-ignore
      map((res:{artists:Singer[]}) => res.artists)
    )
  }
}

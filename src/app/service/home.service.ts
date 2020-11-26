import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from "./service.module";
import {Observable} from "rxjs";
import {Banner, HotTag, SongSheet} from "./data-types/common.types";
import {HttpClient} from "@angular/common/http";
import {map} from  'rxjs/internal/operators';

@Injectable({
  providedIn: ServiceModule
})
export class HomeService {

  constructor(private http:HttpClient,@Inject(API_CONFIG) private url:string) { }

  getBanners():Observable<Banner[]> {
    return this.http.get(this.url + 'banner')
      // @ts-ignore
      .pipe(map((res: { banners: Banner[] }) => res.banners));
  }


  getHotTags():Observable<HotTag[]>{
    return this.http.get(this.url + 'playlist/hot')
      // @ts-ignore
      .pipe(map((res:{tags:HotTag[]}) => {
        return res.tags.sort((x:HotTag,y:HotTag)=>{
          return x.position - y.position
        }).splice(0,5)
      }))
  }

  getPerosonalSheetList():Observable<SongSheet[]>{
    return this.http.get(this.url+'personalized')
      // @ts-ignore
      .pipe(map((res:{result:SongSheet[]}) => res.result.slice(0,16)))
  }
}

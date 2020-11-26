import {Inject, Injectable} from '@angular/core';
import {API_CONFIG, ServiceModule} from "./service.module";
import {Observable} from "rxjs";
import {Banner} from "./data-types/common.types";
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
}

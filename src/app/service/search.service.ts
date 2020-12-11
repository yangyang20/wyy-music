import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {API_CONFIG, ServiceModule} from "./service.module";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";
import {SearchResult} from "./data-types/common.types";

@Injectable({
  providedIn: ServiceModule
})
export class SearchService {

  constructor(private http:HttpClient,@Inject(API_CONFIG)private url:string) { }


  getSearch(keywords:string):Observable<SearchResult>{
    const params = {params:new HttpParams().set('keywords',keywords)}
    return this.http.get<{result:SearchResult}>(this.url+'search/suggest',params).pipe(map((res:{result:SearchResult})=>
      res.result
    ))
  }

}

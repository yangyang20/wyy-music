import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_CONFIG} from "./service.module";
import {LoginParams, LoginRes, User} from './data-types/member.type';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {convertObj} from '../utils/object';


@Injectable({
  providedIn: 'root'
})
export class MemberService{


  constructor(private http:HttpClient,@Inject(API_CONFIG) private url:string) {}

  login(loginParams:LoginParams):Observable<LoginRes>{
    let param = convertObj(loginParams)
    const params = {params:new HttpParams({fromString: param})}
    return this.http.get<LoginRes>(this.url + 'login/cellphone',params)
  }
}

import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {API_CONFIG} from "./service.module";
import {LoginParams, LoginRes, Signin, User} from './data-types/member.type';
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {convertObj} from '../utils/object';


@Injectable({
  providedIn: 'root'
})
export class MemberService{


  constructor(private http:HttpClient,@Inject(API_CONFIG) private url:string) {}

  //登录
  login(loginParams:LoginParams):Observable<LoginRes>{
    let param = convertObj(loginParams)
    const params = {params:new HttpParams({fromString: param})}
    return this.http.get<LoginRes>(this.url + 'login/cellphone',params)
  }

  //用户详情
  getUserDetail(uid:number):Observable<User>{
    const params = {params: new HttpParams().set('uid',String(uid))}
    return this.http.get(this.url + 'user/detail',params).pipe(
      map(res=> res as User)
    )
  }
  //退出登录
  logout(){
    return this.http.get(this.url+'logout')
  }

  //签到
  signin(type:number=1):Observable<Signin>{
    const params = {params:new HttpParams().set('type',String(type))}
    return this.http.get(this.url+'daily_signin',params).pipe(map(res=>res as Signin))
  }

}

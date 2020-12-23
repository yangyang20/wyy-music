import {Inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {API_CONFIG} from "./service.module";
import {LoginParams, User} from "./data-types/member.type";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class MemberService{


  constructor(private http:HttpClient,@Inject(API_CONFIG) private url:string) {}

  loGin(loginParams:LoginParams):Observable<User>{
    return this.http.post<{profile:User}>(this.url + 'login/cellphone',loginParams).
    pipe(map((res:{profile:User})=>res.profile))
  }
}

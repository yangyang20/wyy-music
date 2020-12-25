import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {MemberService} from "../../../service/member.service";
import {RecordVal, User, UserSheet} from "../../../service/data-types/member.type";
import {first} from "rxjs/operators";




type CenterDataType = [User, RecordVal[], UserSheet];

@Injectable({
  providedIn:'root'
})
export class CenterResolver implements Resolve<CenterDataType>{
  constructor(
    private memberServe: MemberService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):Observable<CenterDataType>{
    const uid = route.paramMap.get('id');
    if (uid) {
      return forkJoin([
        this.memberServe.getUserDetail(Number(uid)),
        this.memberServe.getUserRecord(Number(uid)),
        this.memberServe.getUserSheets(Number(uid)),
      ]).pipe(first());
    } else {
      this.router.navigate(['/home']);
      return of();
    }
  }

}

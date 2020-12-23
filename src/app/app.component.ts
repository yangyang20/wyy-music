import {Component} from '@angular/core';
import {LoginParams, User} from './service/data-types/member.type';
import {Observable} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SearchService} from "./service/search.service";
import {ModalTypes} from "./store/reducers/member.reducer";
import {Store} from "@ngrx/store";
import {AppStoreModule} from "./store";
import {SetModalType} from "./store/actions/member.action";
import {BatchActionsService} from "./store/batch-actions.service";
import {MemberService} from "./service/member.service";
import {NzMessageService} from 'ng-zorro-antd/message';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'wyy-music';
  menu = [
    {
      label: '发现',
      path: '/home'
    },
    {
      label: '歌单',
      path: '/sheet'
    }
  ];

  user: User | undefined;

  routeTitle = '';
  private navEnd!: Observable<NavigationEnd>;
  constructor(private activateRoute:ActivatedRoute,
              private router:Router,
              private searchService:SearchService,
              private store$:Store<AppStoreModule>,
              private batchActionsService:BatchActionsService,
              private memberService:MemberService,
              private messageServe:NzMessageService) {
  }



  onChangeModalType(modalType:ModalTypes=ModalTypes.Default){
    this.store$.dispatch(SetModalType({modalType}))
  }


  openModal(modalType:'loginByPhone' | 'register'){
    if (modalType ==='loginByPhone'){
      this.batchActionsService.controlModal(true,ModalTypes.LoginByPhone)
    }else if (modalType === 'register'){
      this.batchActionsService.controlModal(true,ModalTypes.Register)
    }
  }



  onLogin(loginParams:LoginParams){
    this.memberService.login(loginParams).subscribe(res=>{
      if (res.code ==200){
        console.log(res);
        this.user = res.profile
        this.batchActionsService.controlModal(false)
        // window['localStorage']
        localStorage.setItem('user_id',String(this.user!.profile.userId))
        this.alertMessage('success','登录成功')
      }else {
        this.alertMessage('error',res.msg|| '登录失败')
      }
    },error => {
      console.log(error);
      this.alertMessage('error',error.msg|| '登录失败')
    })
  }


  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }
}

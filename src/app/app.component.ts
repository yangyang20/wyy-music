import {Component} from '@angular/core';
import {LoginParams, Profile, User} from './service/data-types/member.type';
import {Observable} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SearchService} from "./service/search.service";
import {ModalTypes} from "./store/reducers/member.reducer";
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "./store";
import {SetModalType, SetUserID} from "./store/actions/member.action";
import {BatchActionsService} from "./store/batch-actions.service";
import {MemberService} from "./service/member.service";
import {NzMessageService} from 'ng-zorro-antd/message';
import {StorageService} from "./service/storage.service";
import {getMember, getUserId} from "./store/selectors/member.selectors";




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

  user?: User;
  routeTitle = '';
  private navEnd!: Observable<NavigationEnd>;

  constructor(private activateRoute:ActivatedRoute,
              private router:Router,
              private searchService:SearchService,
              private store$:Store<AppStoreModule>,
              private batchActionsService:BatchActionsService,
              private memberService:MemberService,
              private messageServe:NzMessageService,
              private storageService:StorageService) {

    const userId = this.storageService.getStorage('user_id')
    if (userId){
      this.store$.dispatch(SetUserID({userId}))
      const user = this.storageService.getStorage('user_info')
      if (user){
        this.user = JSON.parse(user)
      }else{
        this.getUserDetail(userId)
      }
    }

  }



  onChangeModalType(modalType:ModalTypes=ModalTypes.Default){
    this.store$.dispatch(SetModalType({modalType}))
  }


  openModal(modalType:'loginByPhone' | 'register'){
    this.batchActionsService.controlModal(true,(modalType as ModalTypes))
  }



  onLogin(loginParams:LoginParams){
    this.memberService.login(loginParams).subscribe(res=>{
      if (res.code ==200){
        const userId = res.profile!.userId
        this.batchActionsService.controlModal(false)
        this.storageService.setStorage({key:'user_id',value:String(userId)})
        this.storageService.setStorage({key:'token',value:res.token})
        this.storageService.setStorage({key:'cookie',value:res.cookie},'session')
        this.store$.dispatch(SetUserID({userId:userId}))
        this.getUserDetail(userId)
        this.alertMessage('success','登录成功')
      }else {
        this.alertMessage('error',res.msg|| '登录失败')
      }
    },error => {
      this.alertMessage('error',error.msg|| '登录失败')
    })
  }


  outLogin(){
    this.memberService.logout().subscribe(()=>{
      this.batchActionsService.userOutLogin()
      this.user = undefined
      this.alertMessage('success','退出成功')
    })

  }

  private getUserDetail(uid:number){
    this.memberService.getUserDetail(uid).subscribe(user=>{
      this.user = user
      this.storageService.setStorage({key:'user_info',value:JSON.stringify(user)})
    })
  }


  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }
}

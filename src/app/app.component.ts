import {Component} from '@angular/core';
import {User} from './service/data-types/member.type';
import {Observable} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SearchService} from "./service/search.service";
import {ModalTypes} from "./store/reducers/member.reducer";
import {Store} from "@ngrx/store";
import {AppStoreModule} from "./store";
import {SetModalType} from "./store/actions/member.action";
import {BatchActionsService} from "./store/batch-actions.service";


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
              private batchActionsService:BatchActionsService) {
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
}

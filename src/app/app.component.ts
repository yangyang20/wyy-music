import { Component } from '@angular/core';
import {User} from './service/data-types/member.type';
import {Observable} from "rxjs";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {SearchService} from "./service/search.service";


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
              private searchService:SearchService) {
  }


  //搜索
  onSearch(searchVal:string){
      this.searchService.getSearch(searchVal).subscribe(searchResult=>{
        console.log(searchResult);
      })
  }

}

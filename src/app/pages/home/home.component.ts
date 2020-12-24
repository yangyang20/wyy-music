import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {Banner, HotTag, Singer, SongSheet} from '../../service/data-types/common.types';
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import {SingerService} from '../../service/singer.service';
import {SheetService} from '../../service/sheet.service';
import {select, Store} from '@ngrx/store';
import {AppStoreModule} from '../../store';
import {SetCurrentIndex, SetPlayList, SetSongList} from '../../store/actions/player.actions';
import {BatchActionsService} from "../../store/batch-actions.service";
import {ModalTypes} from "../../store/reducers/member.reducer";
import {User} from "../../service/data-types/member.type";
import {SetUserID} from "../../store/actions/member.action";
import {StorageService} from "../../service/storage.service";
import {MemberService} from "../../service/member.service";
import {getMember, getUserId} from "../../store/selectors/member.selectors";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  //当前的banner图的index
  carouselIndex = 0
  banners: Banner[] = []
  tags:HotTag[] = []
  songSheet:SongSheet[] = []
  singer:Singer[] = []

  user?:User
  @ViewChild(NzCarouselComponent,{ static:true }) private nzCarousel!: NzCarouselComponent

  constructor(private homeService:HomeService,
              private singerService:SingerService,
              private sheetService:SheetService,
              private store$:Store<AppStoreModule>,
              private batchActionsService:BatchActionsService,
              private storageService:StorageService,
              private memberService:MemberService,
              ) {
    //这里需要使用监听器才能实时同步
    this.store$.pipe(select(getMember),select(getUserId)).subscribe(userId=>{
      // const userId = this.storageService.getStorage('user_id')
      if (userId){
        this.store$.dispatch(SetUserID({userId}))
        const user = this.storageService.getStorage('user_info')
        if (user){
          this.user = JSON.parse(user)
        }else{
          this.getUserDetail(userId)
        }
      }else {
        this.user = undefined
      }
    })

  }


  getBanners(){
    this.homeService.getBanners().subscribe( banners=>{
      this.banners = banners
    })
  }

  getHotTags(){
    this.homeService.getHotTags().subscribe(tags=>{
      this.tags = tags
    })
  }

  getPerosonalSheetList(){
    this.homeService.getPerosonalSheetList().subscribe(result=>{
      this.songSheet = result
    })
  }

  getEnterSinger(){
    this.singerService.getEnterSinger().subscribe(singer=>{
      this.singer= singer
    })
  }


  ngOnInit(): void {
    this.getBanners()
    this.getHotTags()
    this.getPerosonalSheetList()
    this.getEnterSinger()
  }


  // @ts-ignore
  OnbeforeChange({ to }){
    this.carouselIndex = to;
  }

  onChangeSlide(type: 'pre'|'next'){
    this.nzCarousel[type]()
  }

  onPlaySheet(SongSheetId:number){
    this.sheetService.playSheet(SongSheetId).subscribe(list=>{
      this.store$.dispatch(SetSongList({songList:list}))
      this.store$.dispatch(SetPlayList({playList:list}))
      this.store$.dispatch(SetCurrentIndex({currentIndex:0}))
    })
  }

  openModal(){
    this.batchActionsService.controlModal(true,ModalTypes.Default)
  }

  private getUserDetail(uid:number){
    this.memberService.getUserDetail(uid).subscribe(user=>{
      this.user = user
      this.storageService.setStorage({key:'user_info',value:JSON.stringify(user)})
    })
  }
}

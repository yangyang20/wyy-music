import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {Banner, HotTag, Singer, SongSheet} from '../../service/data-types/common.types';
import {NzCarouselComponent} from "ng-zorro-antd/carousel";
import {SingerService} from '../../service/singer.service';

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

  // @ts-ignore  拿到Carousel的实例
  @ViewChild(NzCarouselComponent,{ status:true }) private nzCarousel: NzCarouselComponent

  constructor(private homeService:HomeService,private singerService:SingerService) {

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
}

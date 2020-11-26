import {Component, OnInit, ViewChild} from '@angular/core';
import {HomeService} from "../../service/home.service";
import {Banner} from "../../service/data-types/common.types";
import {NzCarouselComponent} from "ng-zorro-antd/carousel";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {
  //当前的banner图的index
  carouselIndex = 0
  banners: Banner[] = []

  // @ts-ignore  拿到Carousel的实例
  @ViewChild(NzCarouselComponent,{ status:true }) private nzCarousel: NzCarouselComponent

  constructor(private homeService:HomeService) {
    this.homeService.getBanners().subscribe( banners=>{
      this.banners = banners
    })
  }

  ngOnInit(): void {

  }


  // @ts-ignore
  OnbeforeChange({ to }){
    this.carouselIndex = to;
  }

  onChangeSlide(type: 'pre'|'next'){
    this.nzCarousel[type]()
  }
}

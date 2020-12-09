import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SheetList, SheetParams, SongSheet} from '../../service/data-types/common.types';
import {SheetService} from '../../service/sheet.service';

@Component({
  selector: 'app-sheet-list',
  templateUrl: './sheet-list.component.html',
  styleUrls: ['./sheet-list.component.less']
})
export class SheetListComponent implements OnInit {
  listParams: SheetParams = {
    cat: '全部',
    order: 'hot',
    offset: 1,
    limit: 35
  };

  sheetList!:SheetList
  playList:SongSheet[]=[]

  orderValue:string=''

  constructor(private route: ActivatedRoute,private sheetService:SheetService) {
     const cat = this.route.snapshot.paramMap.get('cat');
     this.listParams.cat = cat?cat:'全部'
  }

  ngOnInit(): void {
    this.orderValue = this.listParams.order
    this.getSheetList()
  }


  getSheetList(){
    this.sheetService.getSheets(this.listParams).subscribe(sheetList=>{
      this.sheetList = sheetList
      this.playList = sheetList.playlists
      this.playList.map(item=>item.picUrl=item.coverImgUrl)
    })
  }

  onPlaySheet(sheetId:number){

  }
}

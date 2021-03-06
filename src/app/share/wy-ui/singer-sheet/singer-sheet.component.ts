import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {SongSheet} from "../../../service/data-types/common.types";

@Component({
  selector: 'app-singer-sheet',
  templateUrl: './singer-sheet.component.html',
  styleUrls: ['./singer-sheet.component.less']
})
export class SingerSheetComponent implements OnInit{

  @Input()sheet:SongSheet = {
    id:1,
    name:'无数据',
    picUrl:'',
    playCount:0,
    tracks:[]
  }
  @Output()onPlay = new EventEmitter<number>();

  constructor() { }



  ngOnInit(): void {
  }


  getSheet(id:number){
    this.onPlay.emit(id)
  }


  sheetImg(sheet:SongSheet){
    return sheet.picUrl?sheet.picUrl:sheet.coverImgUrl
  }
}

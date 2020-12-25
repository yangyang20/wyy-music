import {Component, Input, OnInit} from '@angular/core';
import {SongSheet} from "../../../service/data-types/common.types";

@Component({
  selector: 'app-wy-sheet-table',
  templateUrl: './wy-sheet-table.component.html',
  styleUrls: ['./wy-sheet-table.component.less']
})
export class WySheetTableComponent implements OnInit {

  @Input() sheetInfo:SongSheet = {
    id:0,
    name:'',
    picUrl:'',
    playCount:0,
    tracks:[],
    coverImgUrl:'',
    creator:{avatarUrl:'', nickname:'string'},
    createTime:0,
    subscribedCount:0,
    shareCount:0,
    tags:[],
    userId:0,
    subscribed:false,
    description:''
  }

  constructor() { }

  ngOnInit(): void {
  }

  onAddSong(){

  }
}

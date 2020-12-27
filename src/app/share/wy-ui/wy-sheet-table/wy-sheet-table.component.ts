import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {SongSheet} from "../../../service/data-types/common.types";

@Component({
  selector: 'app-wy-sheet-table',
  templateUrl: './wy-sheet-table.component.html',
  styleUrls: ['./wy-sheet-table.component.less'],
  encapsulation: ViewEncapsulation.None
})
export class WySheetTableComponent implements OnInit,OnChanges {

  @Input() songList:any[] = []

  @Input() currentIndex=-1

  @Input() showContent:'album'|'playCount'|undefined

  constructor() { }

  ngOnInit(): void {
  }



  onAddSong(){

  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }
}

import {Component, Input, OnInit} from '@angular/core';
import {Song} from "../../../../service/data-types/common.types";

@Component({
  selector: 'app-wy-player-panel',
  templateUrl: './wy-player-panel.component.html',
  styleUrls: ['./wy-player-panel.component.less']
})
export class WyPlayerPanelComponent implements OnInit {

  @Input()SongList:Song[] = []
  @Input() currentSong:Song = {
    id:0,
    name:'',
    url:'',
    ar:[],
    al:{id:0,name:'',picUrl:''},
    dt:0,
  };
  constructor() { }

  ngOnInit(): void {
  }

}

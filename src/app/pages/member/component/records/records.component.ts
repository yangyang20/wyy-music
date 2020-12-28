import {Component, Input, OnInit} from '@angular/core';
import {RecordVal} from "../../../../service/data-types/member.type";
import {RecordType} from "../../../../service/member.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.less']
})
export class RecordsComponent implements OnInit {

  @Input()records:RecordVal[] = [];

  @Input()currentIndex =-1

  @Input()listenSongs=0

  @Input()recordType = RecordType.weekData;
  constructor() { }

  ngOnInit(): void {
  }

}

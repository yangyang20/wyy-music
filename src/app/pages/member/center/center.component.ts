import { Component, OnInit } from '@angular/core';
import {map} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";
import {RecordVal, User, UserSheet} from "../../../service/data-types/member.type";

@Component({
  selector: 'app-center',
  templateUrl: './center.component.html',
  styleUrls: ['./center.component.less']
})
export class CenterComponent implements OnInit {
  user!:User
  records!:RecordVal[]
  userSheet!:UserSheet

  constructor(private route:ActivatedRoute) {
    this.route.data.pipe(map(res => res.user)).subscribe(([user, userRecord, userSheet])=>{
      this.user = user;
      this.records = userRecord.slice(0, 10);
      this.userSheet = userSheet;
      // this.listenCurrentSong();
    })
  }

  ngOnInit(): void {
  }

}

import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {User} from "../../../../service/data-types/member.type";
import {MemberService} from "../../../../service/member.service";
import {NzMessageService} from "ng-zorro-antd/message";
import {timer} from "rxjs";

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.less']
})
export class MemberCardComponent implements OnInit {

  tipTitle = '';
  showTip = false;
  @Input() user:User|undefined

  @Output() openModal = new EventEmitter<void>()
  constructor(private memberService:MemberService,
              private messageServe:NzMessageService) { }

  ngOnInit(): void {
  }


  onSignin(){
    this.memberService.signin().subscribe(signin=>{
      if (signin.code ===200){
          this.alertMessage('success','签到成功')
          this.tipTitle= '积分+'+signin.point
          this.showTip=true
          timer(1500).subscribe(()=>{
            this.tipTitle=''
            this.showTip=false
          })
        }else{
          this.alertMessage('error','签到失败')
          this.tipTitle= signin.msg!
          this.showTip=true
          timer(1500).subscribe(()=>{
            this.tipTitle=''
            this.showTip=false
          })
        }
    },error => {
      this.alertMessage('error',error.error.msg)
    })
  }

  private alertMessage(type: string, msg: string) {
    this.messageServe.create(type, msg);
  }
}

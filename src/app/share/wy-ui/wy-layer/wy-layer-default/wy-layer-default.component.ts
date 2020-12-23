import {Component, OnInit, ChangeDetectionStrategy, Output, EventEmitter} from '@angular/core';
import {ModalTypes} from "../../../../store/reducers/member.reducer";

@Component({
  selector: 'app-wy-layer-default',
  template: `
    <div class="cnzt">
      <div class="select-log">
        <div class="mid-wrap">
          <div class="pic">
            <img src="../../../../../assets/images/platform.png" />
          </div>
          <div class="methods">
            <button nz-button nzType="primary" nzSize="large" nzBlock (click)="changeModalTypeEmit('loginByPhone')">手机号登陆</button>
            <button nz-button nzSize="large" nzBlock (click)="changeModalTypeEmit('register')">注册</button>
          </div>
        </div>
      </div>
    </div>
  `,
  styleUrls: ['./wy-layer-default.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WyLayerDefaultComponent implements OnInit {


  @Output() onChangeModalType = new EventEmitter<ModalTypes>()
  constructor() { }

  ngOnInit(): void {
  }

  changeModalTypeEmit(modalType:'loginByPhone'|'register'){
    if (modalType ==='loginByPhone'){
      this.onChangeModalType.emit(ModalTypes.LoginByPhone)
    }else if (modalType === 'register'){
      this.onChangeModalType.emit(ModalTypes.Register)
    }
  }
}

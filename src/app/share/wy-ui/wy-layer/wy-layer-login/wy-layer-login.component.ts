import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ModalTypes} from "../../../../store/reducers/member.reducer";
import {LoginParams} from "../../../../service/data-types/member.type";




@Component({
  selector: 'app-wy-layer-login',
  templateUrl: './wy-layer-login.component.html',
  styleUrls: ['./wy-layer-login.component.less']
})
export class WyLayerLoginComponent implements OnInit {

  @Output() onChangeModalType = new EventEmitter<ModalTypes>()

  @Output() onLogin = new EventEmitter<LoginParams>()

  formModel: FormGroup = new FormGroup({
    phone: new FormControl(''),
    password: new FormControl(''),
    remember: new FormControl('')
  })
  constructor(private fb:FormBuilder) {
    this.formModel = this.fb.group({
      phone:['18627143152',[Validators.required,Validators.pattern(/^1\d{10}$/)]],
      password:['ly393622951',[Validators.required,Validators.minLength(6)]],
      remember:[false]
    })
  }

  ngOnInit(): void {
  }


  onSubmit(){
    if (this.formModel.valid){
      this.onLogin.emit(this.formModel.value)
    }
  }


  changeModalTypeEmit(modalType:'register'|'default'){
    if (modalType === 'register'){
      this.onChangeModalType.emit(ModalTypes.Register)
    }else if (modalType === 'default'){
      this.onChangeModalType.emit(ModalTypes.Default)
    }
  }
}

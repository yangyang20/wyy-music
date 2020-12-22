import { Component, OnInit } from '@angular/core';
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-wy-layer-login',
  templateUrl: './wy-layer-login.component.html',
  styleUrls: ['./wy-layer-login.component.less']
})
export class WyLayerLoginComponent implements OnInit {


  formModel: FormGroup|undefined;
  constructor() { }

  ngOnInit(): void {
  }


  onSubmit(){}

}

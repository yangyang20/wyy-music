import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewChild, ViewContainerRef
} from '@angular/core';
import {fromEvent} from "rxjs";
import {debounceTime, distinctUntilChanged, pluck} from "rxjs/operators";

import {WySearchPanelComponent} from './wy-search-panel/wy-search-panel.component';
import {SearchResult} from '../../../service/data-types/common.types';
@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit,AfterViewInit {

  @Input() customView: TemplateRef<any>|undefined

  @ViewChild('nzInput',{static:false,read:ElementRef}) inputElement!:ElementRef


  //搜索结果的显示与隐藏
  visible:boolean = true

  searchValue:string=''



  constructor() {

  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.monitorInput()
  }

  private monitorInput(){
    fromEvent(this.inputElement!.nativeElement,'input').pipe(
      //pluck 给定描述对象属性路径的字符串的列表，然后从源 Observable 中的所有值中检索指定嵌套
      //  属性的值。如果属性无法解析，它会返回 `undefined`
      debounceTime(300), distinctUntilChanged(), pluck('target', 'value')
    ).subscribe(value => {
      this.searchValue = String(value)

    })


  }




  onFocus(){

  }




}

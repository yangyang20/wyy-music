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
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
@Component({
  selector: 'app-wy-search',
  templateUrl: './wy-search.component.html',
  styleUrls: ['./wy-search.component.less']
})
export class WySearchComponent implements OnInit,AfterViewInit {

  @Input() customView: TemplateRef<any>|undefined

  @Output()onSearch = new EventEmitter<string>()

  @ViewChild('nzInput',{static:false,read:ElementRef}) inputElement!:ElementRef


  private overlayRef: OverlayRef|undefined;

  constructor(private overlay: Overlay,
              private viewContainerRef: ViewContainerRef,) { }

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
      this.onSearch.emit(String(value))
      this.toggleOverlayPanel(value)
    })


  }



 toggleOverlayPanel(data:any){
    if (data){
      this.showOverlayPanel();
    }else {
      this.hideOverlayPanel();
    }
  }

  private showOverlayPanel(){

  }

  private hideOverlayPanel(){

  }

  onFocus(){

  }




}

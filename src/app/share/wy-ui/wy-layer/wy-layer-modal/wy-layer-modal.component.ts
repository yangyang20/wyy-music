import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter, Inject,
  OnInit,
  Output, Renderer2, ViewChild
} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../../../store";
import {getMember, getModalType, getModalVisible} from "../../../../store/selectors/member.selectors";
import {ModalTypes} from "../../../../store/reducers/member.reducer";
import { Overlay, OverlayRef, OverlayKeyboardDispatcher, BlockScrollStrategy, OverlayContainer } from '@angular/cdk/overlay';
import {BatchActionsService} from '../../../../store/batch-actions.service';
import {getHideDomSize, keepCenter} from '../../../../utils/domCalculation';
import {DOCUMENT} from '@angular/common';



@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyLayerModalComponent implements OnInit ,AfterViewInit {

  //显示控制
  showModal:boolean=false
  visible:boolean=false
  currentModalType:ModalTypes=ModalTypes.Default
  //弹窗时的滚轮控制
  private blockScrollStrategy:BlockScrollStrategy

  private overlayRef: OverlayRef|undefined;


  private resizeHandle!: () => void
  @ViewChild('modalContainer',{static:true}) modalRef!:ElementRef

  constructor(private store$:Store<AppStoreModule>,
              private overlay:Overlay,
              private elementRef:ElementRef,
              private overlayKeyboardDispatcher:OverlayKeyboardDispatcher,
              private cdr:ChangeDetectorRef,
              private batchActionsService:BatchActionsService,
              private rd:Renderer2) {
    const appStore = this.store$.pipe(select(getMember))
    appStore.pipe(select(getModalVisible)).subscribe(visib=>this.watchModalVisible(visib))
    appStore.pipe(select(getModalType)).subscribe(type=>this.watchModalType(type))
    this.blockScrollStrategy = this.overlay.scrollStrategies.block()
  }

  ngAfterViewInit(): void {
    this.listenResizeToCenter()
  }

  ngOnInit(): void {
    this.createOverlay()
  }



  private listenResizeToCenter(){
    const modalHtml = this.modalRef.nativeElement
    const modalSize = getHideDomSize(modalHtml)
    keepCenter(modalHtml,modalSize)
    //监听窗口大小改变，使弹窗持续居中
    this.resizeHandle = this.rd.listen('window','resize',()=>{
      keepCenter(modalHtml,modalSize)
    })
  }

  private createOverlay(){
    this.overlayRef = this.overlay.create()
    this.overlayRef.overlayElement.appendChild(this.elementRef.nativeElement)
    this.overlayRef.keydownEvents().subscribe(e=>this.keydownListener(e))
  }

  private keydownListener(event:KeyboardEvent){
    if (event.key === 'Escape') {
      this.hide();
    }
  }

  private watchModalVisible(visible:boolean){
    if (this.visible!=visible){
      this.visible = visible
      this.handleVisibleChange(visible)
    }
  }

  private watchModalType(type:ModalTypes){
    if (this.currentModalType !=type){
      this.currentModalType = type
    }
  }

  private handleVisibleChange(visible:boolean){
    this.showModal = visible
    if (visible){
      this.listenResizeToCenter()
      this.blockScrollStrategy.enable()
      this.overlayKeyboardDispatcher.add(this.overlayRef!)
    }else{
      this.resizeHandle()
      this.blockScrollStrategy.disable()
      this.overlayKeyboardDispatcher.remove(this.overlayRef!)
    }
    this.cdr.markForCheck()
  }


  hide(){
    this.batchActionsService.controlModal(false)
  }
}

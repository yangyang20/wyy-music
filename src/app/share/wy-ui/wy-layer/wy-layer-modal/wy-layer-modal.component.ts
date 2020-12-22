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
import {animate, state, style, transition, trigger} from "@angular/animations";



@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  // changeDetection: ChangeDetectionStrategy.OnPush,
  animations:[trigger('showHide',[
    state('show',style({transform: 'scale(1)',opacity:1})),
    state('hide',style({transform:'scale(0)',opacity:0})),
    transition('show<=>hide',animate('0.1s'))
  ])]
})
export class WyLayerModalComponent implements OnInit ,AfterViewInit {

  //显示控制
  showModal = 'hide'
  visible:boolean=false
  currentModalType:ModalTypes=ModalTypes.Default
  //弹窗时的滚轮控制
  private blockScrollStrategy:BlockScrollStrategy

  private overlayRef: OverlayRef|undefined;

  private overlayContainerEl:HTMLElement|undefined

  private resizeHandle!: () => void
  @ViewChild('modalContainer',{static:true}) modalRef!:ElementRef

  constructor(private store$:Store<AppStoreModule>,
              private overlay:Overlay,
              private elementRef:ElementRef,
              private overlayKeyboardDispatcher:OverlayKeyboardDispatcher,
              private cdr:ChangeDetectorRef,
              private batchActionsService:BatchActionsService,
              private rd:Renderer2,
              private overlayContainerSever:OverlayContainer) {
    const appStore = this.store$.pipe(select(getMember))
    appStore.pipe(select(getModalVisible)).subscribe(visib=>this.watchModalVisible(visib))
    appStore.pipe(select(getModalType)).subscribe(type=>this.watchModalType(type))
    this.blockScrollStrategy = this.overlay.scrollStrategies.block()
  }

  ngAfterViewInit(): void {
    this.overlayContainerEl = this.overlayContainerSever.getContainerElement()
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

    if (visible){
      this.showModal = 'show'
      this.listenResizeToCenter()
      this.blockScrollStrategy.enable()
      this.changePointerEvents('auto')
      this.overlayKeyboardDispatcher.add(this.overlayRef!)
    }else{
      this.showModal = 'hide'
      this.resizeHandle()
      this.blockScrollStrategy.disable()
      this.changePointerEvents('none')
      this.overlayKeyboardDispatcher.remove(this.overlayRef!)
    }
    this.cdr.markForCheck()
  }


  private changePointerEvents(type:'none'|'auto'){
    if (this.overlayContainerEl){
      this.overlayContainerEl.style.pointerEvents = type
    }
  }

  hide(){
    this.batchActionsService.controlModal(false)
  }
}

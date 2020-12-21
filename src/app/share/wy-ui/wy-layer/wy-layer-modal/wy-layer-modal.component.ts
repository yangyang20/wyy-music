import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  OnInit,
  Output
} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../../../store";
import {getMember, getModalType, getModalVisible} from "../../../../store/selectors/member.selectors";
import {ModalTypes} from "../../../../store/reducers/member.reducer";
import { Overlay, OverlayRef, OverlayKeyboardDispatcher, BlockScrollStrategy, OverlayContainer } from '@angular/cdk/overlay';



@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyLayerModalComponent implements OnInit {


  showModal:boolean=false
  visib:boolean=false
  currentModalType:ModalTypes=ModalTypes.Default


  private overlayRef: OverlayRef|undefined;
  constructor(private store$:Store<AppStoreModule>,
              private overlay:Overlay,
              private elementRef:ElementRef,
              private overlayKeyboardDispatcher:OverlayKeyboardDispatcher,
              private cdr:ChangeDetectorRef) {
    const appStore = this.store$.pipe(select(getMember))
    appStore.pipe(select(getModalVisible)).subscribe(visib=>this.watchModalVisible(visib))
    appStore.pipe(select(getModalType)).subscribe(type=>this.watchModalType(type))
  }

  ngOnInit(): void {
    this.createOverlay()
  }


  private createOverlay(){
    this.overlayRef = this.overlay.create()
    this.overlayRef.overlayElement.appendChild(this.elementRef.nativeElement)
    this.overlayRef.keydownEvents().subscribe(e=>this.keydownListener(e))
  }

  private keydownListener(event:KeyboardEvent){
    console.log(event);
  }

  private watchModalVisible(visib:boolean){
    if (this.visib!=visib){
      this.visib = visib
      this.handleVisibleChange(visib)
    }
  }

  private watchModalType(type:ModalTypes){
    if (this.currentModalType !=type){
      this.currentModalType = type
    }
  }

  private handleVisibleChange(visib:boolean){
    this.showModal = visib
    if (visib){
      this.overlayKeyboardDispatcher.add(this.overlayRef!)
    }else{
      this.overlayKeyboardDispatcher.remove(this.overlayRef!)
    }
    this.cdr.markForCheck()
  }

}

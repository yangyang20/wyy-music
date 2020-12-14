import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppStoreModule} from "../../../../store";
import {getMember, getModalVisible} from "../../../../store/selectors/member.selectors";

@Component({
  selector: 'app-wy-layer-modal',
  templateUrl: './wy-layer-modal.component.html',
  styleUrls: ['./wy-layer-modal.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WyLayerModalComponent implements OnInit {

  constructor(private store$:Store<AppStoreModule>) {
    const appStore = this.store$.pipe(select(getMember))
    appStore.pipe(select(getModalVisible)).subscribe(visib=>{

    })
  }

  ngOnInit(): void {
  }

}

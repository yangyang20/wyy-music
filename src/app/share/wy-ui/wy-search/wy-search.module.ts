import { NgModule } from '@angular/core';

import { WySearchComponent } from './wy-search.component';
import {AppCommonModule} from "../../appCommon.module";
import { WySearchPanelComponent } from './wy-search-panel/wy-search-panel.component';
import {NzOverlayModule} from "ng-zorro-antd/core/overlay";




@NgModule({
  declarations: [WySearchComponent, WySearchPanelComponent],
  exports: [
    WySearchComponent,
    AppCommonModule,
  ],
  imports: [
    AppCommonModule,
  ]
})
export class WySearchModule { }

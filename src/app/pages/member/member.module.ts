import { NgModule } from '@angular/core';
import { MemberRoutingModule } from './member-routing.module';
import { CenterComponent } from './center/center.component';
import {ShareModule} from "../../share/share.module";
import { RecordsComponent } from './component/records/records.component';
import {SingerSheetComponent} from "../../share/wy-ui/singer-sheet/singer-sheet.component";


@NgModule({
  declarations: [CenterComponent, RecordsComponent],
  imports: [
    ShareModule,
    MemberRoutingModule
  ],
  exports:[
    ShareModule,
  ]
})
export class MemberModule { }

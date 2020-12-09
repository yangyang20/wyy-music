import { NgModule } from '@angular/core';
import { SingerSheetComponent } from './singer-sheet/singer-sheet.component';
import {PlayCountPipe} from "../play-count.pipe";
import {RouterModule} from "@angular/router";




@NgModule({
  declarations: [SingerSheetComponent,PlayCountPipe],
    imports: [
        RouterModule
    ],
  exports:[
    SingerSheetComponent,
    PlayCountPipe
  ]
})
export class WyUiModule { }

import { NgModule } from '@angular/core';
import { SingerSheetComponent } from './singer-sheet/singer-sheet.component';
import {PlayCountPipe} from "../play-count.pipe";



@NgModule({
  declarations: [SingerSheetComponent,PlayCountPipe],
  imports: [],
  exports:[
    SingerSheetComponent,
    PlayCountPipe
  ]
})
export class WyUiModule { }

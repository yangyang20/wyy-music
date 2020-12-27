import { NgModule } from '@angular/core';
import { SingerSheetComponent } from './singer-sheet/singer-sheet.component';
import {PlayCountPipe} from "../play-count.pipe";
import {RouterModule} from "@angular/router";
import {WySearchModule} from "./wy-search/wy-search.module";
import { WySheetTableComponent } from './wy-sheet-table/wy-sheet-table.component';




@NgModule({
  declarations: [SingerSheetComponent,PlayCountPipe, WySheetTableComponent],
    imports: [
      RouterModule,
      WySearchModule,
    ],
    exports: [
        SingerSheetComponent,
        PlayCountPipe,
        WySearchModule,
        WySheetTableComponent,
    ]
})
export class WyUiModule { }

import { NgModule } from '@angular/core';
import { SingerSheetComponent } from './singer-sheet/singer-sheet.component';
import {PlayCountPipe} from "../play-count.pipe";
import {RouterModule} from "@angular/router";
import {WySearchModule} from "./wy-search/wy-search.module";





@NgModule({
  declarations: [SingerSheetComponent,PlayCountPipe],
    imports: [
      RouterModule,
      WySearchModule,
    ],
    exports: [
        SingerSheetComponent,
        PlayCountPipe,
        WySearchModule,
    ]
})
export class WyUiModule { }

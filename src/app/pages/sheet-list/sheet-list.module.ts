import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SheetListRoutingModule } from './sheet-list-routing.module';
import { SheetListComponent } from './sheet-list.component';
import {ShareModule} from '../../share/share.module';


@NgModule({
  declarations: [SheetListComponent],
  imports: [
    ShareModule,
    SheetListRoutingModule
  ]
})
export class SheetListModule { }

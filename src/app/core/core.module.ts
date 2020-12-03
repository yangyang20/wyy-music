import {NgModule, Optional, SkipSelf} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ServiceModule} from '../service/service.module';
import {ShareModule} from '../share/share.module';
import {PagesModule} from '../pages/pages.module';
import {AppRoutingModule} from '../app-routing.module';
import {AppStoreModule} from '../store';




@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ServiceModule,
    PagesModule,
    ShareModule,
    AppRoutingModule,
    AppStoreModule,
  ],
  exports: [
    ShareModule,
    AppRoutingModule
  ],
})
export class CoreModule {
  constructor(@SkipSelf() @Optional() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error('CoreModule 只能被appModule引入');
    }
  }
}

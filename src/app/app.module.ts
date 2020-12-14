import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { zh_CN } from 'ng-zorro-antd/i18n';
import { registerLocaleData} from '@angular/common';
import zh from '@angular/common/locales/zh';
import {CoreModule} from './core/core.module';
import {NzButtonModule} from 'ng-zorro-antd/button';
import {NzLayoutModule} from 'ng-zorro-antd/layout';
import {RouterModule} from '@angular/router';
import {NzMenuModule} from 'ng-zorro-antd/menu';
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { StoreModule } from '@ngrx/store';
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzModalModule} from 'ng-zorro-antd/modal';
import {WyLayerModule} from "./share/wy-ui/wy-layer/wy-layer.module";


registerLocaleData(zh);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      CoreModule,
      NzButtonModule,
      NzLayoutModule,
      RouterModule,
      NzMenuModule,
      NzAvatarModule,
      NzMessageModule,
      NzModalModule,
      WyLayerModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }],
  bootstrap: [AppComponent]
})
export class AppModule { }

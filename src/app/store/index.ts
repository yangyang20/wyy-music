import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {playerReducer} from './reducers/player.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';




@NgModule({
  declarations: [],
  imports: [
    // @ts-ignore
    StoreModule.forRoot({ player:playerReducer },{
      runtimeChecks: {
        strictActionImmutability:true,
        strictStateImmutability:true,
        strictStateSerializability:true,
        strictActionSerializability:true
      }
    }),
    StoreDevtoolsModule.instrument({
      maxAge:20,
      logOnly:environment.production
    })

  ]
})
export class AppStoreModule { }

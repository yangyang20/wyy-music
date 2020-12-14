import { NgModule } from '@angular/core';
import {StoreModule} from '@ngrx/store';
import {playerReducer} from './reducers/player.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {environment} from '../../environments/environment';
import {memberReducer} from "./reducers/member.reducer";




@NgModule({
  declarations: [],
  imports: [
    // @ts-ignore
    StoreModule.forRoot({ player:playerReducer,member:memberReducer },{
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

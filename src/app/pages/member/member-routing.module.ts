import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {CenterComponent} from "./center/center.component";
import {CenterResolver} from "./center/center.resolver";

const routes: Routes = [
  {path:'member/:id',component:CenterComponent,data:{title:'个人中心'},resolve:{user:CenterResolver}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers:[
    CenterResolver
  ]
})
export class MemberRoutingModule { }

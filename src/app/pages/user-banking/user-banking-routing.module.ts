import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserBankingComponent } from './user-banking.component';
import { CreaterequestComponent } from './createrequest/createrequest.component';




const routes: Routes = [
  {path:'',component:UserBankingComponent},
  {path:'create',component:CreaterequestComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserBankingRoutingModule { }

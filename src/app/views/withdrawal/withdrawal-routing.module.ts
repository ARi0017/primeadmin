import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WithdrawalComponent } from './withdrawal.component';

const routes: Routes = [
  {
    path: '',
    component: WithdrawalComponent,
    data: {
      title: 'Payouts'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WithdrawalRoutingModule { }

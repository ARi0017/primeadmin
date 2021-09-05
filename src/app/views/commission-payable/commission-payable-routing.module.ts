import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionPayableComponent } from './commission-payable.component';

const routes: Routes = [
  {
    path: '',
    component: CommissionPayableComponent,
    data: {
      title: 'Commission Payable Statement'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionPayableRoutingModule { }
 
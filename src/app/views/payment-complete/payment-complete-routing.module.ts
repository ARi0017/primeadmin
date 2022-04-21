import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PaymentCompleteComponent } from './payment-complete.component';

const routes: Routes = [
  {
    path: '',
    component: PaymentCompleteComponent,
    data: {
      title: 'Past withdrawals'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentCompleteRoutingModule { }

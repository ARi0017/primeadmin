import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VendorPaymentComponent } from './vendor-payment.component';

const routes: Routes = [
  {
    path: '',
    component: VendorPaymentComponent,
    data: {
      title: 'Summery Of Vendors Payments'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorPaymentRoutingModule { }

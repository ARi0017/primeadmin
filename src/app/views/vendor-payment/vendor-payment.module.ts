import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPaymentRoutingModule } from './vendor-payment-routing.module';
import { VendorPaymentComponent } from './vendor-payment.component';

@NgModule({
  declarations: [VendorPaymentComponent],
  imports: [
    CommonModule,
    VendorPaymentRoutingModule
  ]
})
export class VendorPaymentModule { }

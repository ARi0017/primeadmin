import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RefundRoutingModule } from './refund-routing.module';
import { RefundComponent } from './refund.component';
import { HttpClientModule } from '@angular/common/http';
import { DataTableModule } from "angular2-datatable";
import { ButtonsModule } from 'ngx-bootstrap/buttons';
@NgModule({
  declarations: [RefundComponent],
  imports: [
    CommonModule,
    RefundRoutingModule,
    HttpClientModule,
    DataTableModule,
    ButtonsModule
  ]
})
export class RefundModule { }

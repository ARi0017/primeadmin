import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap/modal";
import { PaymentCompleteRoutingModule } from './payment-complete-routing.module';
import { PaymentCompleteComponent } from './payment-complete.component';
import { DataTableModule } from "angular2-datatable";
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
@NgModule({
  declarations: [PaymentCompleteComponent],
  imports: [
    CommonModule,
    PaymentCompleteRoutingModule,
    DataTableModule,
    FormsModule,
    ModalModule.forRoot(),
    SelectModule,
    PaginationModule.forRoot(),
    BsDropdownModule,
    ButtonsModule.forRoot()
  ]
})
export class PaymentCompleteModule { }

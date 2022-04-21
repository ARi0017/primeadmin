import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalModule } from "ngx-bootstrap/modal";
import { WithdrawalRoutingModule } from './withdrawal-routing.module';
import { WithdrawalComponent } from './withdrawal.component';
import { DataTableModule } from "angular2-datatable";
import { SelectModule } from 'ng-select';
import { PaginationModule } from 'ngx-bootstrap/pagination';

import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
 
@NgModule({
  declarations: [WithdrawalComponent],
  imports: [
    CommonModule,
    WithdrawalRoutingModule,
    DataTableModule,
    SelectModule,
    PaginationModule.forRoot(),
    FormsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot()
  ]
})
export class WithdrawalModule { }

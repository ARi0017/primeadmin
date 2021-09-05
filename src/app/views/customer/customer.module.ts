import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// Modal Component
import { ModalModule } from "ngx-bootstrap/modal";
import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerComponent } from './customer.component';
import { CommonModule } from '@angular/common';
import { CustomerListComponent } from './customer-list.component';
import { DataTableModule } from "angular2-datatable";
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CustomerRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule,
    PaginationModule.forRoot(),
  ],
  exports: [CustomerComponent],
  declarations: [ CustomerComponent , CustomerListComponent ]
})
export class CustomerModule { }

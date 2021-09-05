import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import { CommonModule } from '@angular/common';
import { OrdersListComponent } from './orders-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTableModule } from 'angular2-datatable';
import { OrderMapComponent } from './order-map.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FinalorderComponent } from './finalorder/finalorder.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    DataTableModule,
    ModalModule.forRoot(),
    BsDatepickerModule.forRoot()
  ],
  exports: [OrdersComponent],
  declarations: [ OrdersComponent , OrdersListComponent, OrderMapComponent, FinalorderComponent],
  providers:[CanDeactivateGuardService],
})
export class OrdersModule { }

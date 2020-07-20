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

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    OrdersRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports: [OrdersComponent],
  declarations: [ OrdersComponent , OrdersListComponent],
  providers:[CanDeactivateGuardService],
})
export class OrdersModule { }

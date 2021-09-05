import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersListComponent } from './orders-list.component';
import { OrdersComponent } from './orders.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { InvoiceComponent } from '../invoice/invoice.component';
import { OrderMapComponent } from './order-map.component';
import {FinalorderComponent} from '../orders/finalorder/finalorder.component';
const routes: Routes = [
  {
    path: 'add',
    component: OrdersComponent,
    canDeactivate: [CanDeactivateGuardService],
    data: {
      title: 'Add Order'
    }
  },
  {
    path: '',
    component: OrdersListComponent,
    data: {
      title: 'Order List'
    }
  },
  {
    path: 'order-map',
    component: OrderMapComponent,
    data: {
      title: "Order Mapping"
    }
  },
  {
    path: 'edit/:id',
    component: OrdersComponent,
    data: {
      title: 'Edit Order'
    }
  },
  {
    path: 'payment-details',
    component: FinalorderComponent,
    data: {
      title: 'payment'
    }
  }
  // {
  //   path: 'print/:id',
  //   component: InvoiceComponent,
  //   data: {
  //     title: 'Print Order'
  //   }
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}

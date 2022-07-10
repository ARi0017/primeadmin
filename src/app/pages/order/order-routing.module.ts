import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrderStatusComponent } from './order-status/order-status.component';
import { OrderComponent } from './order.component';


const routes: Routes = [
  {
    path: "",
    component: OrderComponent
  },
  {
    path: "status",
    component: OrderStatusComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderRoutingModule { }

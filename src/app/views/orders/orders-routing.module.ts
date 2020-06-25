import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersListComponent } from './orders-list.component';
import { OrdersComponent } from './orders.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'add',
    component: OrdersComponent,
    canDeactivate: [CanDeactivateGuardService],
    data: {
      title: 'Add Categories'
    }
  },
  {
    path: '',
    component: OrdersListComponent,
    data: {
      title: 'Categories List'
    }
  },
  {
    path: 'edit/:id',
    component: OrdersComponent,
    data: {
      title: 'Edit Categories'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule {}

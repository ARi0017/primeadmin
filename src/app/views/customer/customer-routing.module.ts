import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerListComponent } from './customer-list.component';
import { CustomerComponent } from './customer.component';
import { CustomerAddressComponent } from './customer-address.component';

const routes: Routes = [
  {
    path: 'add',
    component: CustomerComponent,
    data: {
      title: 'Add Customer'
    }
  },
  {
    path: '',
    component: CustomerListComponent,
    data: {
      title: 'Customer List'
    }
  },
  {
    path: 'edit/:id',
    component: CustomerComponent,
    data: {
      title: 'Edit Customer'
    }
  },
  {
    path: 'address/:id',
    component: CustomerAddressComponent,
    data: {
      title: 'Add Address'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule {}

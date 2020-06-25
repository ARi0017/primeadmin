import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductsComponent } from './products.component';
import { ProductListComponent } from './product-list.component';

const routes: Routes = [
  {
    path: 'add',
    component: ProductsComponent,
    data: {
      title: 'Products'
    }
  },
  {
    path: 'edit/:id',
    component: ProductsComponent,
    data: {
      title: 'Edit Product'
    }
  },
  {
    path: '',
    component: ProductListComponent,
    data: {
      title: 'Products List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule {}

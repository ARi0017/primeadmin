import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './product.component';
import { AddEditProductComponent } from './add-edit-product/add-edit-product.component';


const routes: Routes = [
  {
    path: "",
    component: ProductComponent,
  },
  {
    path: "add",
    component: AddEditProductComponent,
  },
  {
    path: "edit/:id",
    component: AddEditProductComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }

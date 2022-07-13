import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerDetailComponent } from './customer-detail/customer-detail.component';
import { CustomerComponent } from './customer.component';


const routes: Routes = [
  {
    path: "",
    component: CustomerComponent
  },
  {
    path: "detail/:id",
    component: CustomerDetailComponent,
  },
  // {
  //   path: "edit/:id",
  //   component: AddmatchComponent,
  // },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }

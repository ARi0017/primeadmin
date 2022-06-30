import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './customer.component';


const routes: Routes = [
  {
    path: "",
    component: CustomerComponent
  },
  // {
  //   path: "add",
  //   component: AddmatchComponent,
  // },
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

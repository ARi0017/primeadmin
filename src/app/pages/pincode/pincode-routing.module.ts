import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PincodeComponent } from "./pincode.component";
import { AddEditPincodeComponent } from './add-edit-pincode/add-edit-pincode.component';


const routes: Routes = [
  {
    path: "",
    component: PincodeComponent,
  },
  {
    path: "add",
    component: AddEditPincodeComponent,
  },
  {
    path: "edit/:id",
    component: AddEditPincodeComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PincodeRoutingModule { }

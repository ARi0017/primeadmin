import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddEditDriverComponent } from './add-edit-driver/add-edit-driver.component';
import { DriverComponent } from './driver.component';


const routes: Routes = [
  {
    path: "",
    component: DriverComponent,
  },
  {
    path: "add",
    component: AddEditDriverComponent,
  },
  {
    path: "edit/:id",
    component: AddEditDriverComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZoneComponent } from "./zone.component";
import { AddEditZoneComponent } from "./add-edit-zone/add-edit-zone.component";
 

const routes: Routes = [
  {
    path: "",
    component: ZoneComponent,
  },
  {
    path: "add",
    component: AddEditZoneComponent,
  },
  {
    path: "edit/:id",
    component: AddEditZoneComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ZoneRoutingModule { }

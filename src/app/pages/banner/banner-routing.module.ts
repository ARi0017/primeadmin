import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BannerComponent } from "./banner.component";
import { AddEditBannerComponent } from "./add-edit-banner/add-edit-banner.component";



const routes: Routes = [
  {
    path: "",
    component: BannerComponent,
  },
  {
    path: "add",
    component: AddEditBannerComponent,
  },
  {
    path: "edit/:id",
    component: AddEditBannerComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannerRoutingModule { }

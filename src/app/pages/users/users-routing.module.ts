import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";
import { UsersComponent } from "./users.component";

const routes: Routes = [
  {
    path: "",
    component: UsersComponent,
    data: {
      title: "Admin Users",
    },
  },
  {
    path: "add",
    component: AddEditUserComponent,
  },
  {
    path: "edit/:id",
    component: AddEditUserComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule { }
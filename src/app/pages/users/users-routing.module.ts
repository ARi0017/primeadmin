import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users.component';
import { AddEditUsersComponent } from './add-edit-users/add-edit-users.component';

const routes: Routes = [
  {path:'',component:UsersComponent},
  {path:'add',component:AddEditUsersComponent},
  {path: "edit/:id",component:AddEditUsersComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }

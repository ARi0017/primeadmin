import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MenuComponent } from './menu.component';
import { AddEditMenuComponent } from './add-edit-menu/add-edit-menu.component';

const routes: Routes = [
  {
    path: '',
    component: MenuComponent
  },
  {
    path: 'add',
    component: AddEditMenuComponent
  },
  {
    path: 'edit/:id',
    component: AddEditMenuComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }

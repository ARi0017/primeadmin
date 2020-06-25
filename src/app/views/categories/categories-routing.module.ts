import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoriesListComponent } from './categories-list.component';
import { CategoriesComponent } from './categories.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'add',
    component: CategoriesComponent,
    canDeactivate: [CanDeactivateGuardService],
    data: {
      title: 'Add Categories'
    }
  },
  {
    path: '',
    component: CategoriesListComponent,
    data: {
      title: 'Categories List'
    }
  },
  {
    path: 'edit/:id',
    component: CategoriesComponent,
    data: {
      title: 'Edit Categories'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RetailerListComponent } from './retailer-list.component';
import { RetailerComponent } from './retailer.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'add',
    component: RetailerComponent,
    canDeactivate: [CanDeactivateGuardService],
    data: {
      title: 'Add Vendor'
    }
  },
  {
    path: '',
    component: RetailerListComponent,
    data: {
      title: 'Vendor List'
    }
  },
  {
    path: 'edit/:id',
    component: RetailerComponent,
    data: {
      title: 'Edit Vendor'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule {}

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
      title: 'Add Retailer'
    }
  },
  {
    path: '',
    component: RetailerListComponent,
    data: {
      title: 'Retailer List'
    }
  },
  {
    path: 'edit/:id',
    component: RetailerComponent,
    data: {
      title: 'Edit Retailer'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerRoutingModule {}

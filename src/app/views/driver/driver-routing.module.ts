import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DriverListComponent } from './driver-list.component';
import { DriverComponent } from './driver.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';

const routes: Routes = [
  {
    path: 'add',
    component: DriverComponent,
    canDeactivate: [CanDeactivateGuardService],
    data: {
      title: 'Add Driver'
    }
  },
  {
    path: '',
    component: DriverListComponent,
    data: {
      title: 'Driver List'
    }
  },
  {
    path: 'edit/:id',
    component: DriverComponent,
    data: {
      title: 'Edit Driver'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DriverRoutingModule {}

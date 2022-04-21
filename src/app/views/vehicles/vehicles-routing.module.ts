import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { VehiclesComponent } from './vehicles.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesListComponent,
    data: {
      title: 'Vehicles List'
    }
  },
  {
    path: 'add',
    component: VehiclesComponent,
    canDeactivate: [CanDeactivateGuardService],
    data: {
      title: 'Add Vehicle'
    }
  },
  {
    path: 'edit/:id',
    component: VehiclesComponent,
    data: {
      title: 'Edit Vehicle'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule {}

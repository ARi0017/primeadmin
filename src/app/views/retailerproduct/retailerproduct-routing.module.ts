import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { RetailerproductListComponent } from './retailerproduct-list.component';

const routes: Routes = [

  {
    path: '',
    component: RetailerproductListComponent,
    data: {
      title: 'Retailer Product List'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RetailerproductRoutingModule {}

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PincodeComponent } from './pincode.component';
import { PincodeListComponent } from './pincode-list/pincode-list.component';


const routes: Routes = [
  {
    path: 'add',
    component: PincodeComponent,
    data: {
      title: 'Add Pincode'
    }
  },
  {
    path: '',
    component: PincodeListComponent,
    data: {
      title: 'Pincode'
    }
  },
  {
    path: 'edit/:id',
    component: PincodeComponent,
    data: {
      title: 'Edit Pincode'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PincodeRoutingModule {}

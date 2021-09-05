import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BannermasterListComponent } from './bannermaster-list.component';
import { BannermasterComponent } from './bannermaster.component';

const routes: Routes = [
  {
    path: 'add',
    component: BannermasterComponent,
    data: {
      title: 'Add Banner'
    }
  },
  {
    path: '',
    component: BannermasterListComponent,
    data: {
      title: 'Banner List'
    }
  },
  {
    path: 'edit/:id',
    component: BannermasterComponent,
    data: {
      title: 'Edit Banner'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BannermasterRoutingModule {}

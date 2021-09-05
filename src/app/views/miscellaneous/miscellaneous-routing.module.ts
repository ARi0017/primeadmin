import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscellaneousComponent } from './miscellaneous.component';
import { MiscellaneousListComponent } from './miscellaneous-list/miscellaneous-list.component';




const routes: Routes = [
  {
    path: '',
    component: MiscellaneousListComponent,
    data: {
      title: 'Tax & Others'
    }
  },
  {
    path: 'add',
    component: MiscellaneousComponent,
    data: {
      title: 'Add Tax & Others'
    }
  },
  {
    path: 'edit',
    component: MiscellaneousComponent,
    data: {
      title: 'Edit Tax & Others'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MiscellaneousRoutingModule {}

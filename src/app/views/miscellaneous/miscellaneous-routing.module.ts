import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MiscellaneousComponent } from './miscellaneous.component';
import { MiscellaneousListComponent } from './miscellaneous-list/miscellaneous-list.component';




const routes: Routes = [
  {
    path: '',
    component: MiscellaneousListComponent,
    data: {
      title: 'Miscellaneous'
    }
  },
  {
    path: 'add',
    component: MiscellaneousComponent,
    data: {
      title: 'Add Miscellaneous'
    }
  },
  {
    path: 'edit',
    component: MiscellaneousComponent,
    data: {
      title: 'Edit Miscellaneous'
    }
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class MiscellaneousRoutingModule {}

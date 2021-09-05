import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PeymentreceiptComponent } from './peymentreceipt.component';

const routes: Routes = [
  {
    path: '',
    component: PeymentreceiptComponent,
    data: {
      title: 'Summery Of Payment Receipt And Payable'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PeymentreceiptRoutingModule { }

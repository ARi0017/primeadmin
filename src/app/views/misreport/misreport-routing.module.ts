import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MisreportComponent } from './misreport.component';

const routes: Routes = [
  {
    path: '',
    component: MisreportComponent,
    data: {
      title: 'Sale Register & Payment Summary'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisreportRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MasterReportComponent } from './master-report.component';


const routes: Routes = [
  {
    path: "",
    component: MasterReportComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterReportRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerformancetrakingComponent } from './performancetraking.component';

const routes: Routes = [
  {
    path: '',
    component: PerformancetrakingComponent,
    data: {
      title: 'Performance Tracking'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerformancetrakingRoutingModule { }

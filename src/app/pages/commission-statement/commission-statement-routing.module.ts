import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommissionStatementComponent } from './commission-statement.component';

const routes: Routes = [
  {
    path: "",
    component: CommissionStatementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CommissionStatementRoutingModule { }


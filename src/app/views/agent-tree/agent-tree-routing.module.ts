import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgentTreeComponent } from './agent-tree.component';

const routes: Routes = [
  {
    path: '',
    component: AgentTreeComponent,
    data: {
      title: 'Agnet Tree Traking'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AgentTreeRoutingModule { }

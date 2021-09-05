import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentTreeRoutingModule } from './agent-tree-routing.module';
import { AgentTreeComponent } from './agent-tree.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import {AutocompleteLibModule} from 'angular-ng-autocomplete';
// import {MatExpansionModule} from '@angular/material/expansion'
@NgModule({
  declarations: [AgentTreeComponent],
  imports: [
    CommonModule,
    AgentTreeRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    DataTableModule,
    CollapseModule,
    AutocompleteLibModule,
  //  MatExpansionModule
  ]
})
export class AgentTreeModule { }

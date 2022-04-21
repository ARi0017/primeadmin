import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PerformancetrakingRoutingModule } from './performancetraking-routing.module';
import { PerformancetrakingComponent } from './performancetraking.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';

@NgModule({
  declarations: [PerformancetrakingComponent],
  imports: [
    CommonModule,
    PerformancetrakingRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    DataTableModule
  ]
})
export class PerformancetrakingModule { }

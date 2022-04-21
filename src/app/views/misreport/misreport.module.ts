import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisreportRoutingModule } from './misreport-routing.module';
import { MisreportComponent } from './misreport.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';
@NgModule({
  declarations: [MisreportComponent],
  imports: [
    CommonModule,
    MisreportRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    DataTableModule
  ]
})
export class MisreportModule { }

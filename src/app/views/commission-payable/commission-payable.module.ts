import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommissionPayableRoutingModule } from './commission-payable-routing.module';
import { CommissionPayableComponent } from './commission-payable.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';

@NgModule({
  declarations: [CommissionPayableComponent],
  imports: [
    CommonModule,
    CommissionPayableRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    DataTableModule
  ]
})
export class CommissionPayableModule { }

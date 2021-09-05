import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PeymentreceiptRoutingModule } from './peymentreceipt-routing.module';
import { PeymentreceiptComponent } from './peymentreceipt.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { FormsModule } from '@angular/forms';
import {DataTableModule} from 'angular2-datatable';

@NgModule({
  declarations: [PeymentreceiptComponent],
  imports: [
    CommonModule,
    PeymentreceiptRoutingModule,
    BsDatepickerModule.forRoot(),
    FormsModule,
    DataTableModule
  ]
})
export class PeymentreceiptModule { }

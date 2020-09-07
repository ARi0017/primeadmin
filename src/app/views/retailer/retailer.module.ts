import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { RetailerRoutingModule } from './retailer-routing.module';
import { RetailerComponent } from './retailer.component';
import { CommonModule } from '@angular/common';
import { RetailerListComponent } from './retailer-list.component';

import { DataTableModule } from "angular2-datatable";
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { PaginationModule } from 'ngx-bootstrap/pagination';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RetailerRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DataTableModule,
    PaginationModule.forRoot(),
  ],
  exports: [RetailerComponent],
  declarations: [ RetailerComponent , RetailerListComponent],
  providers:[CanDeactivateGuardService],
})
export class RetailerModule { }

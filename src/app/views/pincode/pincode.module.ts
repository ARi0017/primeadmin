import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { PincodeRoutingModule } from './pincode-routing.module';
import { PincodeComponent } from './pincode.component';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { PincodeListComponent } from './pincode-list/pincode-list.component';
import { DataTableModule } from 'angular2-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    PincodeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    DataTableModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
  ],
  exports: [PincodeComponent],
  declarations: [ PincodeComponent, PincodeListComponent ],
  providers:[CanDeactivateGuardService],
})
export class PincodeModule { }

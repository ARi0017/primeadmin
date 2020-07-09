import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
// Modal Component
import { ModalModule } from "ngx-bootstrap/modal";

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { CommonModule } from '@angular/common';
import { DriverListComponent } from './driver-list.component';
import { DataTableModule } from "angular2-datatable";

import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DriverRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule
  ],
  exports: [DriverComponent],
  declarations: [ DriverComponent , DriverListComponent],
  providers:[CanDeactivateGuardService],
})
export class DriverModule { }

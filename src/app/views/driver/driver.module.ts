import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from './driver.component';
import { CommonModule } from '@angular/common';
import { DriverListComponent } from './driver-list.component';

import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DriverRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  exports: [DriverComponent],
  declarations: [ DriverComponent , DriverListComponent],
  providers:[CanDeactivateGuardService],
})
export class DriverModule { }
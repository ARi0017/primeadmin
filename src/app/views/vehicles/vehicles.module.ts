import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DataTableModule } from 'angular2-datatable';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { VehiclesComponent } from './vehicles.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesListComponent } from './vehicles-list/vehicles-list.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    VehiclesRoutingModule,
    ButtonsModule.forRoot(),
    ModalModule.forRoot(),
    DataTableModule,
    PaginationModule.forRoot()
  ],
  exports: [VehiclesComponent],
  declarations: [VehiclesComponent, VehiclesListComponent],
  providers: [CanDeactivateGuardService]
})
export class VehiclesModule {}

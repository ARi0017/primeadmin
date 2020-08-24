import { NgModule } from '@angular/core';

import { MiscellaneousComponent } from './miscellaneous.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { MiscellaneousRoutingModule } from './miscellaneous-routing.module';
import { MiscellaneousListComponent } from './miscellaneous-list/miscellaneous-list.component';
import { DataTableModule } from 'angular2-datatable';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    BsDropdownModule,
    DataTableModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    MiscellaneousRoutingModule
  ],
  exports: [MiscellaneousComponent],
  declarations: [MiscellaneousComponent, MiscellaneousListComponent],
  providers: [CanDeactivateGuardService],
})
export class MiscellaneousModule { }

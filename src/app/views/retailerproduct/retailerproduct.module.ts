import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { CommonModule } from '@angular/common';

import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { RetailerproductListComponent } from './retailerproduct-list.component';
import { RetailerproductRoutingModule } from './retailerproduct-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RetailerproductRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot()
  ],
  declarations: [RetailerproductListComponent],
  providers:[CanDeactivateGuardService],
})
export class RetailerproductModule { }

import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { BannermasterRoutingModule } from './bannermaster-routing.module';
import { BannermasterComponent } from './bannermaster.component';
import { CommonModule } from '@angular/common';
import { BannermasterListComponent } from './bannermaster-list.component';
import { DataTableModule } from "angular2-datatable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BannermasterRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DataTableModule
  ],
  exports: [BannermasterComponent],
  declarations: [ BannermasterComponent , BannermasterListComponent]
})
export class BannermasterModule { }

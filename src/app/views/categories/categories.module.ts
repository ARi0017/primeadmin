import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { CommonModule } from '@angular/common';
import { CategoriesListComponent } from './categories-list.component'; 
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { DataTableModule } from "angular2-datatable";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CategoriesRoutingModule,
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    DataTableModule,
    PaginationModule.forRoot(),
  ],
  exports: [CategoriesComponent],
  declarations: [ CategoriesComponent , CategoriesListComponent],
  providers:[CanDeactivateGuardService],
})
export class CategoriesModule { }

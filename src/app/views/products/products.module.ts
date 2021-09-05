import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { CommonModule } from "@angular/common";
import { ProductListComponent } from './product-list.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { DataTableModule } from "angular2-datatable";
import { SelectModule } from 'ng-select';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ProductsRoutingModule, 
    ChartsModule,
    BsDropdownModule,
    ButtonsModule.forRoot(),
    SelectModule,
    DataTableModule,
    PaginationModule.forRoot(),
  ],
  exports: [ProductsComponent],
  declarations: [ ProductsComponent , ProductListComponent]
})

export class ProductsModule { }

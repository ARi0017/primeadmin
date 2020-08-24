import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DataTableModule } from 'angular2-datatable';
import { InvoiceComponent } from './invoice.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillModule } from 'ngx-quill';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule,
    CKEditorModule,
    BsDropdownModule,
    DataTableModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),   
    InvoiceRoutingModule, 
    QuillModule.forRoot()

  ],
  declarations: [InvoiceComponent],
  providers: [CanDeactivateGuardService]
})
export class InvoiceModule {}

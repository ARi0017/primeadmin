import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DataTableModule } from 'angular2-datatable';
import { CmsComponent } from './cms.component';
import { CanDeactivateGuardService } from '../../services/can-deactivate-guard.service';
import { CmsRoutingModule } from './cms-routing.module';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { QuillModule } from 'ngx-quill';
import { TextEditorComponent } from './text-editor/text-editor.component';

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
    CmsRoutingModule,
    QuillModule.forRoot()

  ],
  exports: [CmsComponent],
  declarations: [CmsComponent, TextEditorComponent],
  providers: [CanDeactivateGuardService]
})
export class CmsModule {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MasterReportRoutingModule } from './master-report-routing.module';
import { MasterReportComponent } from './master-report.component';


import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzModule } from 'src/app/nz.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [MasterReportComponent],
  imports: [
    CommonModule,
    MasterReportRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NzModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ]
})
export class MasterReportModule { }

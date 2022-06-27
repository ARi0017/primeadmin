import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DriverRoutingModule } from './driver-routing.module';
import { DriverComponent } from '../driver/driver.component';
import { AddEditDriverComponent } from './add-edit-driver/add-edit-driver.component';

import { NzModule } from 'src/app/nz.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [DriverComponent, AddEditDriverComponent],
  imports: [
    CommonModule,
    DriverRoutingModule,
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
export class DriverModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ZoneRoutingModule } from './zone-routing.module';
import { ZoneComponent } from '../zone/zone.component';
import { AddEditZoneComponent } from './add-edit-zone/add-edit-zone.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NzModule } from 'src/app/nz.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [ZoneComponent, AddEditZoneComponent],
  imports: [
    CommonModule,
    ZoneRoutingModule,
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
export class ZoneModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PincodeRoutingModule } from './pincode-routing.module';
import { PincodeComponent } from "./pincode.component";
import { AddEditPincodeComponent } from './add-edit-pincode/add-edit-pincode.component';

import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { NzModule } from 'src/app/nz.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';



export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [PincodeComponent, AddEditPincodeComponent],
  imports: [
    CommonModule,
    PincodeRoutingModule,
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
export class PincodeModule { }

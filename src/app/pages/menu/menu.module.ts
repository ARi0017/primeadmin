import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { MenuComponent } from "./menu.component";
import { QuillModule } from 'ngx-quill';
import { AddEditMenuComponent } from './add-edit-menu/add-edit-menu.component';
import { FormsModule } from '@angular/forms';
import { NzModule } from 'src/app/nz.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MenuRoutingModule } from './menu-routing.module';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}


@NgModule({
  declarations: [MenuComponent, AddEditMenuComponent],
  imports: [CommonModule, FormsModule, NzModule,  MenuRoutingModule,  QuillModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    HttpClientModule
  ],
})
export class MenuModule { }

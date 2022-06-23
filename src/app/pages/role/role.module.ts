import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AddRoleComponent } from "./add-role/add-role.component";
import { RoleComponent } from "./role.component";
import { RoleRoutingModule } from "./role-routing.module";
import { NzModule } from 'src/app/nz.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [RoleComponent, AddRoleComponent],
  imports: [
    CommonModule,
    RoleRoutingModule,
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
  ],
})
export class RoleModule {}

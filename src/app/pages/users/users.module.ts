import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsersRoutingModule } from "./users-routing.module";
import { UsersComponent } from "./users.component";
import { AddEditUserComponent } from "./add-edit-user/add-edit-user.component";
import { FormsModule } from "@angular/forms";
import { NzModule } from "src/app/nz.module";
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { TranslateModule, TranslateLoader } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { QuillModule } from "ngx-quill";
import {
  NgPasswordValidatorModule,
  NgPasswordValidatorOptions,
} from "ng-password-validator";

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export const MyDefaultOptions: NgPasswordValidatorOptions = {
  placement: "bottom",
  theme: "pro",
};

@NgModule({
  declarations: [UsersComponent, AddEditUserComponent],

  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    NzModule,
    NgPasswordValidatorModule.forRoot(
      MyDefaultOptions as NgPasswordValidatorOptions
    ),
    QuillModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient],
      },
    }),
    HttpClientModule,
  ],
})
export class UsersModule {}

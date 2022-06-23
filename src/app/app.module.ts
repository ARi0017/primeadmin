import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { IconsProviderModule } from "./icons-provider.module";
import { FormsModule } from "@angular/forms";
import { HttpClientModule, HttpClientXsrfModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NZ_I18N } from "ng-zorro-antd/i18n";
import { en_US } from "ng-zorro-antd/i18n";
import { registerLocaleData } from "@angular/common";
import en from "@angular/common/locales/en";
import { LoginComponent } from "./pages/login/login.component";
import { DefaultLayoutComponent } from "./layouts/default-layout.component";
import { TokenInterceptorService } from "./services/token-interceptor.service";
import { P404Component } from "./pages/error/404.component";
import { P500Component } from "./pages/error/500.component";
import { CommonComponent } from "./pages/common/common.component";
import { NzModule } from "./nz.module";
import { BnNgIdleService } from "bn-ng-idle";

registerLocaleData(en);


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DefaultLayoutComponent,
    CommonComponent,
    P404Component,
    P500Component,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    HttpClientModule,
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN',
    }),
    FormsModule,
    BrowserAnimationsModule,
    NzModule,

  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
    BnNgIdleService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }

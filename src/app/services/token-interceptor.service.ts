import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpErrorResponse,
  HttpEvent,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import { catchError } from "rxjs/operators";
import { Observable } from "rxjs";
import { NzMessageService } from "ng-zorro-antd/message";
import { Router } from "@angular/router";
import * as CryptoJS from "crypto-js";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  encrypted: string;
  decrypted: string;
  constructor(private injector: Injector) {}
  tokenFromUI: string = "ZPq44zWOdgpslBj7lLzZYA==";

  //Token iterception
  intercept(req, next) {
    let message = this.injector.get(NzMessageService);
    let router = this.injector.get(Router);
    let tokenizedReq = req.clone({});
  
      let authService = this.injector.get(AuthService);

      tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authService.getToken()}`,
        },
      });
   
    return next.handle(tokenizedReq).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          switch (err.status) {
            case 401:
              message.error("401 : Unauthorized");
              router.navigate(["/login"]);
              break;
            case 403:
              message.error("403 : Forbidden");
              router.navigate(["/login"]);
              break;
            case 0:
              message.error("500 : Internal Server Error");
              break;
            case 500:
              message.error("500 : Internal Server Error");
              break;
            default:
              message.error(`${err.status} : ${err.error.message}`);
              break;
          }
        }
        return new Observable<HttpEvent<any>>();
      })
    );
  }

  // CSRF Encryption
  encryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let encrypted = CryptoJS.AES.encrypt(
      JSON.stringify(new Date().getTime()),
      _key,
      {
        keySize: 16,
        iv: _iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      }
    );
    this.encrypted = encrypted.toString();
    return this.encrypted;
  }

  // CSRF Decryption
  /* decryptUsingAES256() {
    let _key = CryptoJS.enc.Utf8.parse(this.tokenFromUI);
    let _iv = CryptoJS.enc.Utf8.parse(this.tokenFromUI);

    this.decrypted = CryptoJS.AES.decrypt(this.encrypted, _key, {
      keySize: 16,
      iv: _iv,
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7,
    }).toString(CryptoJS.enc.Utf8);
  } */
}

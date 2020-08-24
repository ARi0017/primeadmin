import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpErrorResponse, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from './toaster.service';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthGuardService } from './auth-guard.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {


  constructor(private injector: Injector) { }

  intercept(req, next): Observable<HttpEvent<any>> {
    let toaster = this.injector.get(ToasterService);
    let authService = this.injector.get(AuthGuardService)
    let router = this.injector.get(Router);

    let tokenizedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${authService.getToken()}`
      }
    })

    return next.handle(tokenizedReq)
      .pipe(catchError(err => {
        if (err instanceof HttpErrorResponse) {
          toaster.Error(`${err.status} : ${err.statusText}`);
          if (err.status == 401) {
            router.navigate(["/login"]);
          } else if (err.status == 403) {
            router.navigate(['/login']);
          }  // To stop the spinner when error occurs
        }
        return new Observable<HttpEvent<any>>();
      }));
  }

  // handleError(error: HttpErrorResponse) {
  //   // toaster.Error(error.statusText);
  //   this.router.navigate(['/login']);
  //   console.log({ error: error });
  //   return throwError(error);
  // }
}

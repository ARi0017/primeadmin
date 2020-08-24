import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CanActivate } from '@angular/router';
import { CustomerService } from './Customer/customer.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
constructor(private customerService: CustomerService, private router: Router){}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['login']);
      return false;
  }
  return true;
  }

  getToken(){
    return localStorage.getItem('token');
  }


}

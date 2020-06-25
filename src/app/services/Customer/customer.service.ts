import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer';
interface Icustomer { 
  data: object;
  status: number;
}
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }
  getCustomerList(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url}/customerlist`, customer);
  }
  

  AddNewCustomer(customer: Customer): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url}/customeraddedit`, customer);
  }

  getCustomer(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url}/customer`, customer);
  }

  fileupload(adddata: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url}/uploadcustomer`, adddata);
  }

  Login(username: string, password: string): Observable<Customer> {
    return this.http.post<Customer>(`${this.url}/users/login`, { username: username, password: password });
  }

  Logout() {
    let result = this.http.get(`${this.url}/users/logout`);
    return result;
  }
}

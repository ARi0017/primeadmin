import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Customer, CustomerAccount, CustomerAddress } from './../model/customer.model';
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  baseUrl = environment;

  constructor(private http: HttpClient) { }

  //Get all customer list
  customerList(pageIndex: number, pageSize: number, sort: string) {
    let _params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    
    return this.http.get<{data: Customer[], count: number}>(
        `${this.baseUrl.serviceUrl}/customers`,
        {
          params: _params
        }
      );
  }

  //Get customer details by its id
  getCustomerById(id: string): Observable<{ data: Customer, message: string}> {
    return this.http.get<{ data: Customer, message: string}>(`${this.baseUrl.serviceUrl}/customers/${id}`);
  }

  //Add a new customer
  addCustomer(addData: Customer) : Observable<{message: string}> {
    return this.http.post<{message: string}>(
      `${this.baseUrl.serviceUrl}/customers`,
      addData
    );
  }

  //Update customer
  updateCustomer(id: string, editData: Customer) : Observable<{message: string}> {
    return this.http.put<{message: string}>(
      `${this.baseUrl.serviceUrl}/customers/${id}`,
      editData
    );
  }

  getCustomerAddressById(id: string): Observable<{ data: CustomerAddress[], count: number }> {
    return this.http.get<{ data: CustomerAddress[], count: number }>(
      `${this.baseUrl.serviceUrl}/customeraddresses/${id}`,
    );
  }

  getCustomerAccountDetailById(id: string): Observable<{ data: CustomerAccount, count: number }> {
    return this.http.get<{ data: CustomerAccount, count: number }>(
      `${this.baseUrl.serviceUrl}/customeraccounts/${id}`,
    );
  }
}

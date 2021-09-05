import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../../models/customer';
import { Customeraddress } from '../../models/customeraddress';
import { UrlService } from '../Url/url.service';
interface Icustomer {
  data: object;
  customerinfo: object;
  addressinfo: object;
  cartinfo: object;
  ordeinfo: object;
  walletinfo: object;
  accountinfo: object;

  TotalCustomerCount: any;
  status: number;
  Imgurl: string;
  productimg: string;
  ProductImgUrl?: string;
}
@Injectable({
  providedIn: 'root'
})

export class CustomerService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getCustomerList(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customerlist`, customer);
  }
  getCount(): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customercount`, '');
  }

  AddNewCustomer(customer: Customer): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customeraddedit`, customer);
  }

  AddEditCustomerAddress(customeraddress: Customeraddress): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customeradderssupdate`, customeraddress);
  }
  GetAddressbyid(id: string): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customeradderss/${id}`, {});
  }
  GetCustomerCart(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customercart`, customer);
  }

  GetCustomerOrder(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/orderlistbycustomerid`, customer);
  }
  GetCustomerWallet(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customerwallet`, customer);
  }
  DeleteCustomerAddress(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/cutomeradderssdelete`, customer);
  }

  CustomerAddressList(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customeradersslist`, customer);
  }

  CustomerAddressDelete(id: string): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/cutomeradderssdelete`, id);
  }

  getCustomer(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customer`, customer);
  }

  fileupload(adddata: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/uploadcustomer`, adddata);
  }

  Login(username: string, password: string): Observable<Customer> {
    return this.http.post<Customer>(`${this.url.ServiceUrl}/users/login`, { username: username, password: password });
  }

  Logout() {
    let result = this.http.get(`${this.url.ServiceUrl}/users/logout`);
    return result;
  }

  statusChange(customertatus : object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customerstatus`,customertatus);
  }
  getBankData(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customeraccount`, customer);
  }
  CustomerWalletPayment(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/cutomerwalletupdate`, customer);
  }

  getWholeCustomerData(customer: object): Observable<Icustomer> {
    return this.http.post<Icustomer>(`${this.url.ServiceUrl}/customerall`, customer);
  }
  customerListForPayout():Observable<any>{
    return this.http.get<any>(`${this.url.ServiceUrl}/customer-list-payout`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../Url/url.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class WithdrawalService {

  constructor(
    private http: HttpClient, 
    private url: UrlService
  ) { }

  withdrawalList(addData:object):Observable<any>{
    return this.http.post<any>(`${this.url.ServiceUrl}/payouts`,addData);
  }
  withdrawalSelected(addData:object):Observable<any>{
    return this.http.post<any>(`${this.url.ServiceUrl}/payout-selected`,addData);
  }
  withdrawalRequest(addData:object):Observable<any>{
    return this.http.post<any>(`${this.url.ServiceUrl}/widthdrawals-requests`,addData)
  }
  paymentComplete():Observable<any>{
    return this.http.post<any>(`${this.url.ServiceUrl}/past-refund`,"")
  }
}

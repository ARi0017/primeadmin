import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../Url/url.service';
import { Observable } from 'rxjs';

interface ITax{
  count: number;
  data: Array<object>;
  status: number;

}
@Injectable({
  providedIn: 'root'
})
export class TaxCategoryService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getTaxCategories(): Observable<ITax> {
    return this.http.post<ITax>(`${this.url.ServiceUrl}/taxall`, '');
  }
  taxCategoryStatus(taxStatus: object): Observable<ITax> {
    return this.http.post<ITax>(`${this.url.ServiceUrl}/taxstatusupdate`, taxStatus);
  }

  addEditTaxCategory(addEditData: object): Observable<ITax> {
    return this.http.post<ITax>(`${this.url.ServiceUrl}/taxaddedit`, addEditData);
  }
  DailySaleRegister(addData: object): Observable<ITax> {
    return this.http.post<ITax>(`${this.url.ServiceUrl}/daliy-sale-register`, addData);
  }
  CommissionPayable(addData: object): Observable<any> {
    return this.http.post<any>(`${this.url.ServiceUrl}/commission-payable`, addData);
  }
  AgentTreeTraking(addData: object): Observable<any> {
    return this.http.post<any>(`${this.url.ServiceUrl}/agent-tree-traking`, addData);
  }
  paymentReceiptAndPayable(addData:object):Observable<any>{
    return this.http.post<any>(`${this.url.ServiceUrl}/payment-payable-receipt`,addData);
  }
  paymentReceiptAndPayableForCommission(addData:object):Observable<any>{
    return this.http.post<any>(`${this.url.ServiceUrl}/payment-payable-commission-receipt`,addData);
  }
  performanceTraking(addData:object):Observable<any>{
    return this.http.post<any>(`${this.url.ServiceUrl}/performance-tracking`,addData);
  }
  allDriver():Observable<any>{
    return this.http.get<any>(`${this.url.ServiceUrl}/driver-listing`)
  }
}

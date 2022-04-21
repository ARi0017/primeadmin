import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Iorder {
  data: object;
  TotalOrderCount: any;
  status: number;
  master:object;
  detail:object;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getOrders(order: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/orderlist`, order);
  }
  getActiveDriver(): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/activedriverlist`, {});
  }

  orderdrivermap(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordermastermapping`, adddata);
  }

  ordervehiclemap(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/vehicleordermapping`, adddata);
  }

  getCount(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordercount`, adddata);
  }
  cancelOrder(order : object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordercancelbyadmin`,order);
  }
  getOrderWholeData(order: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/orderfulldetailsbyid`, order);
  }

  getOrderReview(): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordermastercurrentdayreview`, null)
  }


  getOrdersForDriverVehicleMap(order: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/pendingorderserachbyvehiclemapping`, order);
  }
  getRouteList(): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordermasterpendingselectroute`, null);
  }
  orderdrivervehiclemap(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordermasterdrivervehiclebulkmapping`, adddata);
  }
  expectedDeliveryTimeUpdate(adddata: object): Observable<Iorder> {
    return this.http.post<any>(`${this.url.ServiceUrl}/expected-delivery-time-update`, adddata);
  }
  paymentList(): Observable<any> {
    return this.http.post<any>(`${this.url.ServiceUrl}/payment-list`,null);
  }
  orderStatusByBank(addData:object): Observable<any> {
    return this.http.post<any>(`${this.url.ServiceUrl}/orderStatusByBank`,addData);
  }
  
}


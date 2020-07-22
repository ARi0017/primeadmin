import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Iorder {
  data: object;
  TotalOrderCount: any;
  status: number;
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

  oderdrivermap(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordermastermapping`, adddata);
  }

  getCount(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordercount`, adddata);
  }
  cancelOrder(order : object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url.ServiceUrl}/ordercancelbyadmin`,order);
  }

}


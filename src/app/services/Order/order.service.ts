import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Iorder {
  data: object;
  status: number;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getOrders(order: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url}/orderlist`, order);
  }
  getActiveDriver(): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url}/activedriverlist`, {});
  }

  oderdrivermap(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url}/ordermastermapping`, adddata);
  }

}


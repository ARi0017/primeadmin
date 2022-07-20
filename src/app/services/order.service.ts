import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { OrderStatus, Order } from '../model/order.model';
import { DriverDropdown } from "../model/driver.model";
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = environment;

  constructor(
      private http: HttpClient
  ) { }

  getOrderStatusForDropDown(): Observable<{ data: OrderStatus[], count: number }> {
    return this.http.get<{ data: OrderStatus[], count: number }>(
      `${this.baseUrl.serviceUrl}/orderstatuses`,
    )
  }

  getOrderList(pageIndex: number, pageSize: number, sort: string): Observable<{ data: any[], count: number }> {
    let _params: HttpParams = new HttpParams();
    _params.append("pageIndex", `${pageIndex}`)
    .append("pageSize", `${pageSize}`)
    .append("sort", `${sort}`);

    return this.http.get<{ data: any[], count: number }>(
      `${this.baseUrl.serviceUrl}/orders`,
      {
        params: _params
      }
    );
  }

  changeOrderStatus(orderId: string, orderStatusId: string): Observable<{ message:string }> {
    return this.http.put<{ message:string }>(
      `${this.baseUrl.serviceUrl}/orders/status/${orderId}`,
      {
        "orderStatusId": orderStatusId
      }
    )
  }

  assignDriverToOrder(orderId: string, driverId: string): Observable<{ message:string }> {
    return this.http.put<{ message:string }>(
      `${this.baseUrl.serviceUrl}/orders/driver-assign/${orderId}`,
      {
        "driverId": driverId
      }
    )
  }

  driverListForDropdown(orderId: string): Observable<{ data: DriverDropdown[] }> {
    return this.http.get<{ data: DriverDropdown[] }>(
      `${this.baseUrl.serviceUrl}/orders/driver-list/${orderId}`
    );
  }

  getOrderDetailsByOrderId(orderId: string): Observable<{ data: any[], count: number }> {
    return this.http.get<{ data: any[], count: number }>(
      `${this.baseUrl.serviceUrl}/orders/${orderId}`,
    )
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { OrderService } from "src/app/services/order.service";
import { OrderStatus } from "src/app/model/order.model";
import { DriverDropdown } from 'src/app/model/driver.model';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent extends CommonComponent implements OnInit {
  allOrders: any[] = [];
  orderStatuses: OrderStatus[] = [];
  drivers: any[] = [];
  total: number = 0;
  loading: Boolean = false;

  constructor(
    private orderService: OrderService,
    private message: NzMessageService,
    router: Router,
    auth: AuthService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.listConsent();
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    this.populateOrderStatuses();
  }

  populateOrderStatuses() {
    this.loading = true; 
    this.orderService.getOrderStatusForDropDown()
      .subscribe((res) => {
        this.orderStatuses = res.data;
        this.loading = false; 
      });
  }


  getAllOrders(): void {
    this.loading = true; 
    this.orderService.getOrderList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allOrders = res.data;
        this.total = res.count;
        this.loading = false; 
      });
  }

  changeOrderStatus(orderId: string, orderStatusId: any): void {
    this.loading = true; 
    this.orderService.changeOrderStatus(orderId, orderStatusId)
      .subscribe((res) => {
        this.message.success(res.message);
        this.loading = false; 
      })
  }

  assignDriverToOrder(orderId: string, driverId: string): void {
    this.loading = true; 
    this.orderService.assignDriverToOrder(orderId, driverId)
      .subscribe((res) => {
        this.message.success(res.message);
        this.loading = false; 
      })
  }
}

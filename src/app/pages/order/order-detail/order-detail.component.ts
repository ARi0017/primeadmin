import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";

import { CommonComponent } from "../../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { OrderService } from "src/app/services/order.service";

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent extends CommonComponent  implements OnInit {
  orderId: string = "";
  orderDetails: any[] = [];
  total: number = 0;
  loading: Boolean = false;

  constructor(
    private orderService: OrderService,
    private message: NzMessageService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.orderId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
  }

  getOrderDetailsById(): void {
    this.loading = true; 
    this.orderService.getOrderDetailsByOrderId(this.orderId)
      .subscribe((res) => {
        this.orderDetails = res.data;
        this.total = res.data.length;
        this.loading = false; 
      });
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { CustomerService } from "src/app/services/customer.service";
import { Customer } from "src/app/model/customer.model";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent extends CommonComponent implements OnInit {
  allCustomers: Customer[] = [];
  total: number = 0;
  loading: Boolean = false;

  constructor(
    private customerService: CustomerService,
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
  }

  getAllCustomers(): void {
    this.loading = true;

    this.customerService.customerList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allCustomers = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }
  
}

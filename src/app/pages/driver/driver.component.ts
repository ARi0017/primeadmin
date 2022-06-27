import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { DriverService } from "src/app/services/driver.service";
import { Driver } from "src/app/model/driver.model";

import { AuthService } from "src/app/services/auth.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent extends CommonComponent implements OnInit {
  allDriver : Driver[];
  id: string;
  total = 1;
  loading: boolean = false;

  constructor(
    private driverService: DriverService,
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

  getMenuList() {
    this.loading = true;
    this.driverService.driverList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allDriver = res.data;
        this.total = res.count;
        this.loading = false;
        console.log(res.data);
      });
  }
}

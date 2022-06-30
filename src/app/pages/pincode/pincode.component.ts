import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { PincodeService } from "src/app/services/pincode.service";
import { Pincode } from "src/app/model/pincode.model";

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.scss']
})
export class PincodeComponent extends CommonComponent implements OnInit {
  allPincodes: Pincode[] = [];
  total: number = 0;
  loading: boolean = false;

  constructor(
    private pincodeService: PincodeService,
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

  getAllPincodes(): void {
    this.loading = true;

    this.pincodeService.pincodeList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allPincodes = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }
}

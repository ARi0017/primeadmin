import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { DriverService } from "src/app/services/driver.service";
import { Driver } from "src/app/model/driver.model";

import { AuthService } from "src/app/services/auth.service";
import { NzMessageService } from "ng-zorro-antd/message";
import { TranslateService } from "@ngx-translate/core";
import { NzUploadFile } from 'ng-zorro-antd';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent extends CommonComponent implements OnInit {
  allDrivers: Driver[] = [];
  total: number = 0;
  loading: Boolean = false;
  fileList: any[] = [];

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

  getAllDrivers() {
    this.loading = true;
    
    this.driverService.driverList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allDrivers = res.data;
        this.total = res.count;
        this.loading = false;
        //console.log(res.data);
      });
  }


  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  importDriver(): void {
    this.loading = true;

    if(this.fileList.length == 1) {
      let formData = new FormData();
      formData.append("file", this.fileList[0]);

      this.driverService.importDriver(formData)
        .subscribe((res) => {
          this.message.success(res.message);
          this.fileList = [];
          this.loading = false;
          this.getAllDrivers();
        });
    } else {
      this.message.error("Please select an excel file");
      this.loading = false;
    }
  }
}

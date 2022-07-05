import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { PincodeService } from "src/app/services/pincode.service";
import { Pincode } from "src/app/model/pincode.model";

import { NzUploadFile } from "ng-zorro-antd/upload";

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.scss']
})
export class PincodeComponent extends CommonComponent implements OnInit {
  allPincodes: Pincode[] = [];
  total: number = 0;
  loading: boolean = false;
  fileList: any[] = [];

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

  // beforeUpload = (file: NzUploadFile): boolean => {
  //   this.fileList = this.fileList.concat(file);
  //   return false;
  // };

  beforeUpload = (file: NzUploadFile) => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  importPincode(): void {
    this.loading = true;

    if(this.fileList.length == 1) {
      let formData = new FormData();
      formData.append("file", this.fileList[0]);

      this.pincodeService.importPincode(formData)
        .subscribe((res) => {
          this.message.success(res.message);
          this.fileList = [];
          this.loading = false;
          this.getAllPincodes();
        });
    } else {
      this.message.error("Please select an excel file");
      this.loading = false;
    }
  }


}

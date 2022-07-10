import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/model/product.model";
import { NzUploadFile } from 'ng-zorro-antd';


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends CommonComponent implements OnInit {
  allProducts: Product[] = [];
  total: number = 0;
  loading: boolean = false;
  fileList: any[] = [];

  constructor(
    private productService: ProductService,
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

  getAllProducts(): void {
    this.loading = true;

    this.productService.productList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allProducts = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  importProduct(): void {
    this.loading = true;

    if(this.fileList.length == 1) {
      let formData: FormData = new FormData();
      formData.append("file", this.fileList[0]);

      this.productService.importProduct(formData)
        .subscribe((res) => {
          this.message.success(res.message);
          this.fileList = [];
          this.loading = false;
          this.getAllProducts();
        });
    } else {
      this.message.error("Please select an excel file");
      this.loading = false;
    }
  }
}

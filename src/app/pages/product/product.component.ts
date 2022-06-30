import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { ProductService } from "src/app/services/product.service";
import { Product } from "src/app/model/product.model";


@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent extends CommonComponent implements OnInit {
  allProducts: Product[] = [];
  total: number = 0;
  loading: boolean = false;

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
}

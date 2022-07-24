import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { ProductService } from "src/app/services/product.service";
import { CategoryService } from 'src/app/services/category.service';
import { CategoryDropDown } from 'src/app/model/category.model';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-category-wise-product',
  templateUrl: './category-wise-product.component.html',
  styleUrls: ['./category-wise-product.component.scss']
})
export class CategoryWiseProductComponent extends CommonComponent implements OnInit {
  categoryId: string = "";
  loading: Boolean = false;
  categories: CategoryDropDown[] = [];
  products: Product[] = [];
  total: number = 0;

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
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
    this.populateCategory();
  }

  populateCategory(): void {
    this.loading = true;
    this.categoryService.categoryListForDropdown()
      .subscribe((res) =>{
        this.categories = res.data;
        this.loading = false;
      })
  }

  getProductsByCategory(selectedCategoryId: any) {
    this.loading = true;
    this.productService.getProductsByCategoryId(selectedCategoryId)
      .subscribe((res) => {
        this.products = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }
}

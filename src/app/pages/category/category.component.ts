import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { CategoryService } from 'src/app/services/category.service';
import { Category } from "src/app/model/category.model";
import { NzUploadFile } from 'ng-zorro-antd';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent extends CommonComponent implements OnInit {
  allCategories: Category[] = [];
  total: number = 0;
  loading: boolean = false;
  fileList: NzUploadFile[] = [];

  constructor(
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
  }

  getAllCategories(): void {
    this.loading = true;

    this.categoryService.categoryList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allCategories = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }

}

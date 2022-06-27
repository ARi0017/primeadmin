import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { MenuService } from "src/app/services/menu.service";
import { IMenu } from "src/app/model/common.model";

import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.scss"],
})
export class MenuComponent extends CommonComponent implements OnInit {
  allMenu: IMenu[];
  menu: { label: string; value: any }[];
  id: any;
  total = 1;
  loading: boolean;

  constructor(
    private menuService: MenuService,
    router: Router,
    auth: AuthService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.listConsent();

    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    //this.getMenuList();
  }

  //To get the Menu List
  getMenuList() {
    this.loading = true;
    this.menuService.menuList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allMenu = res.data;
        this.total = res.count;
        this.loading = false;
        //console.log(res.data);
      });
  }
}

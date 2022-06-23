import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

import { BannerService } from "src/app/services/banner.service";
import { IBanner } from "src/app/model/common.model";
import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends CommonComponent implements OnInit {
  loading: boolean;
  bannerList: IBanner[] = []
  total: number;


  constructor(
    private bannerService: BannerService,
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
  getAllBanners(): void {
    this.bannerService.bannerList(this.pageIndex, this.pageSize, this.sort)
      .subscribe(res => {
        this.bannerList = res.data;
        this.total = res.count;
      });
  }
}

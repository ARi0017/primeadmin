import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { BannerService } from "src/app/services/banner.service";
import { Banner } from "src/app/model/banner.model";
import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends CommonComponent implements OnInit {
  allBanners: Banner[] = []
  total: number = 0;
  loading: boolean = false;


  constructor(
    private bannerService: BannerService,
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
  getAllBanners(): void {
    this.loading = true;

    this.bannerService.bannerList(this.pageIndex, this.pageSize, this.sort)
      .subscribe(res => {
        this.allBanners = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }


  
}

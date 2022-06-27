import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { BannerService } from "src/app/services/banner.service";
import { IBanner } from "src/app/model/banner.model";
import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss']
})
export class BannerComponent extends CommonComponent implements OnInit {
  allBanners: IBanner[] = []
  loading: boolean;
  fileList: any[] = [];
  isLoading = false;
  isVisible = false;
  total: number;


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
    this.loading = true;
  }
  getAllBanners(): void {
    this.bannerService.bannerList(this.pageIndex, this.pageSize, this.sort)
      .subscribe(res => {
        this.allBanners = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }


  uploadCsv() {
    this.isLoading = true;
    let uploadedFile = this.fileList[0] ? this.fileList[0] : "";
    if (!uploadedFile) return this.message.warning("Please select a file.");
    let upload = new FormData();
    upload.append("uploadedFile", uploadedFile);
    this.bannerService.uploadCsv(upload).subscribe((res) => {
      this.message.success(res.message);
      this.isLoading = false;
      this.getAllBanners();
    });
  }

}

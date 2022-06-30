import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Banner } from 'src/app/model/banner.model';


import { BannerService } from "src/app/services/banner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";

import { NzUploadFile } from "ng-zorro-antd/upload";
import StateDistrict  from "./../../../../assets/json_data/indian_state_and_district.json";
import { IndianStateDistrict,State } from "src/app/model/indian-state-district.model"

@Component({
  selector: 'app-add-edit-banner',
  templateUrl: './add-edit-banner.component.html',
  styleUrls: ['./add-edit-banner.component.scss']
})
export class AddEditBannerComponent extends CommonComponent implements OnInit {
  bannerId: string;
  banner: Banner = new Banner();
  fileList: any[] = [];
  loading: Boolean = false;

  wbDistricts: string[] =[];

  indianStateDistrict: IndianStateDistrict = StateDistrict;

  constructor(
    private bannerService: BannerService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.bannerId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    if(this.bannerId) {
      this.getBannerById();
    }

    this.wbDistricts = this.indianStateDistrict.states.find((value, index) => {
      return (value.state == "West Bengal")
    }).districts;
    //console.log(this.wbDistricts.length);
  }


  addBanner(): void {
    this.bannerService.addBanner(this.banner)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["banners"]);
      });
  }

  getBannerById(): void {
    this.bannerService.getBannerById(this.bannerId)
      .subscribe((res)=> {
        this.banner = res.data;
      });
  }

  editBanner(): void {
    this.bannerService.updateBanner(this.bannerId, this.banner)
    .subscribe((res) => {
      this.message.success(res.message);
      this.router.navigate(["banners"]);
    });
  }

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

}

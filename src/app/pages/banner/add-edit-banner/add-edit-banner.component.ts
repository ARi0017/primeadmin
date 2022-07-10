import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Banner } from 'src/app/model/banner.model';


import { BannerService } from "src/app/services/banner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";

import { NzUploadFile } from "ng-zorro-antd/upload";



@Component({
  selector: 'app-add-edit-banner',
  templateUrl: './add-edit-banner.component.html',
  styleUrls: ['./add-edit-banner.component.scss']
})
export class AddEditBannerComponent extends CommonComponent implements OnInit {
  bannerId: string;
  banner: Banner = new Banner();
  fileList: NzUploadFile[] = [];
  loading: Boolean = false;

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
    if(Boolean(this.bannerId)) {
      this.getBannerById();
    }
  }

  

  async addBanner(): Promise<void> {
    if(this.fileList.length == 1) {
      this.banner.image =  await this.getBase64(this.fileList[0]);
      //console.log(this.banner);
      this.bannerService.addBanner(this.banner)
        .subscribe((res) => {
          this.message.success(res.message);
          this.router.navigate(["banners"]);
        });
    } else {
      this.message.error("Please select banner image");
    }
  }

  getBannerById(): void {
    this.bannerService.getBannerById(this.bannerId)
      .subscribe((res)=> {
        this.banner = res.data;
      });
  }


  async editBanner(): Promise<void> {
    this.loading = true;
    this.banner.image = undefined;
    if(this.fileList.length >= 0) {
      if(this.fileList.length == 1) {
        this.banner.image = await this.getBase64(this.fileList[0]);
      }
      
      this.bannerService.updateBanner(this.bannerId, this.banner)
        .subscribe((res) => {
          this.message.success(res.message);
          this.loading = false;
          this.router.navigate(["banners"]);
        });
    } else {
      this.message.error("Please select an image");
      this.loading = false;
    }
  }
  

  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };

  getBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
      var base64String = "";
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        base64String = reader.result.toString();
        //console.log(base64String);
        resolve(base64String);
      };
      reader.onerror = function (error) {
       // console.log('Error: ', error);
      };
    })
 }
}

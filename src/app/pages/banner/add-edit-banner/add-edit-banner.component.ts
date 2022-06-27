import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Banner } from 'src/app/model/banner.model';


import { BannerService } from "src/app/services/banner.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-add-edit-banner',
  templateUrl: './add-edit-banner.component.html',
  styleUrls: ['./add-edit-banner.component.scss']
})
export class AddEditBannerComponent extends CommonComponent implements OnInit {
  bannerId: string;
  banner: Banner = new Banner();

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
  }


  addBanner(): void {
    this.bannerService.addBanner(this.banner)
      .subscribe((res) => {

      });
  }

  editBanner(): void {

  }
}

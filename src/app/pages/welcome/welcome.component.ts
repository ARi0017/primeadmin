import { Component, OnInit } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { WelcomeService } from "src/app/services/welcome.service";
import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { environment } from "../../../environments/environment";
import { EChartsOption, getInstanceByDom } from "echarts";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"],
})
export class WelcomeComponent extends CommonComponent implements OnInit {
  constructor(
    private welcomeService: WelcomeService,
    private message: NzMessageService,
    router: Router,
    auth: AuthService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    
  }
}

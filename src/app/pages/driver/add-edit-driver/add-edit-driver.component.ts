import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { DriverService } from "src/app/services/driver.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";
import { Driver } from "src/app/model/driver.model";

import { NzUploadFile } from "ng-zorro-antd/upload";

@Component({
  selector: 'app-add-edit-driver',
  templateUrl: './add-edit-driver.component.html',
  styleUrls: ['./add-edit-driver.component.scss']
})
export class AddEditDriverComponent extends CommonComponent implements OnInit {
  driverId: string;
  driver: Driver = new Driver();
  fileList: any[] = [];

  constructor(
    private driverService: DriverService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.driverId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    if(!!this.driverId) {
      this.getDriverById();
    }
  }

  getDriverById(): void {
    this.driverService.getDriverById(this.driverId)
      .subscribe((res) => {
        this.driver = res.data;
      });
  }

  addDriver(): void {
    this.driverService.addDriver(this.driver)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["drivers"]);
      });
  }

  editDriver(): void {
    this.driverService.updateDriver(this.driverId, this.driver)
    .subscribe((res) => {
      this.message.success(res.message);
      this.router.navigate(["drivers"]);
    });
  }


  beforeUpload = (file: NzUploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  };
}

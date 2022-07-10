import { Component, OnInit } from "@angular/core";
import { DriverService } from "src/app/services/driver.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";
import { Driver } from "src/app/model/driver.model";

import { NzUploadFile } from "ng-zorro-antd/upload";
import { ZoneDropdown } from "src/app/model/zone.model";
import { ZoneService } from "src/app/services/zone.service";

@Component({
  selector: 'app-add-edit-driver',
  templateUrl: './add-edit-driver.component.html',
  styleUrls: ['./add-edit-driver.component.scss']
})
export class AddEditDriverComponent extends CommonComponent implements OnInit {
  driverId: string;
  driver: Driver = new Driver();
  zones: ZoneDropdown[] = [];
  loading: boolean = false;
  fileList: any[] = [];

  constructor(
    private driverService: DriverService,
    private zoneService: ZoneService,
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
    this.populateZone();
    if(!!this.driverId) {
      this.getDriverById();
    }
  }

  populateZone(): void {
    this.loading = true;
    this.zoneService.zoneListForDropdown()
      .subscribe((res) => {
        this.zones = res.data;
        this.loading = false;
      });
  }

  getDriverById(): void {
    this.driverService.getDriverById(this.driverId)
      .subscribe((res) => {
        this.driver = res.data;
        this.driver.isOnlineBoolean = Boolean(Number(this.driver.isOnline));
      });
  }

  async addDriver(): Promise<void> {
    this.loading = true;
    this.driver.image = undefined;
    if(this.fileList.length >= 0) {
      if(this.fileList.length == 1) {
        this.driver.image = await this.getBase64(this.fileList[0]);
      }
      
      this.driver.isOnline = this.driver.isOnlineBoolean ? "1" : "0";
      this.driver.isOnlineBoolean = undefined;
      //console.log(this.driver);
      this.driverService.addDriver(this.driver)
        .subscribe((res) => {
          this.message.success(res.message);
          this.loading = false;
          this.router.navigate(["drivers"]);
        });
    } else {
      this.message.error("Please select an image");
      this.loading = false;
    }
  }

  async editDriver(): Promise<void> {
    this.loading = true;
    this.driver.image = undefined;
    if(this.fileList.length >= 0) {
      if(this.fileList.length == 1) {
        this.driver.image = await this.getBase64(this.fileList[0]);
      }
      
      this.driver.isOnline = this.driver.isOnlineBoolean ? "1" : "0";
      this.driver.isOnlineBoolean = undefined;
      //console.log(this.driver);
      this.driverService.updateDriver(this.driverId, this.driver)
        .subscribe((res) => {
          this.message.success(res.message);
          this.loading = false;
          this.router.navigate(["drivers"]);
        });
    } else {
      this.message.error("Please select an image");
      this.loading = false;
    }
  }
  


  beforeUpload = (file: NzUploadFile): boolean => {
    //console.log(file);
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
        //console.log('Error: ', error);
      };
    })
  }
}

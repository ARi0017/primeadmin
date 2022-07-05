import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { Pincode } from 'src/app/model/pincode.model';

import { CommonComponent } from "../../common/common.component";
import { PincodeService } from "src/app/services/pincode.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

import { ZoneDropdown } from "src/app/model/zone.model";
import { ZoneService } from "src/app/services/zone.service";


@Component({
  selector: 'app-add-edit-pincode',
  templateUrl: './add-edit-pincode.component.html',
  styleUrls: ['./add-edit-pincode.component.scss']
})
export class AddEditPincodeComponent extends CommonComponent implements OnInit {
  loading: Boolean = false;
  pincodeId: string;
  pincode: Pincode = new Pincode();
  zones: ZoneDropdown[] = [];


  constructor(
    private pincodeService: PincodeService,
    private zoneService: ZoneService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.pincodeId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    this.pupulateZone();

    if (this.pincodeId) {
      this.getPincodebyId();
      this.editConsent();
    } else {
      this.addConsent();
    }
  }

  pupulateZone(): void {
    this.loading = true;

    this.zoneService.zoneListForDropdown()
      .subscribe((res) => {
        this.zones  = res.data;
        this.loading = false;
      });
  }
  

  addPincode(): void {
    //console.log(this.pincode);
    this.pincodeService.addPincode(this.pincode)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["pincodes"]);
      });
  }

  //Get a Pincode details by its id
  getPincodebyId() {
    this.loading = true;

    this.pincodeService.getPincodeById(this.pincodeId)
      .subscribe((res) => {
        this.pincode = res.data;
        this.loading = false;
      });
  }


  editPincode(): void {
    //console.log(this.pincode);
    this.pincodeService.updatePincode(this.pincodeId, this.pincode)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["pincodes"]);
      });
  }

  onZoneChange(selectedZoneId: any): void {
    //console.log(selectedZoneId);
    this.loading = true;

    if(selectedZoneId) {
      this.zoneService.getZoneById(selectedZoneId)
        .subscribe((res) => {
          this.pincode.area = res.data.area;
          this.pincode.district = res.data.district;
          this.loading = false;
        });
    } else {
      this.pincode.area = "";
      this.pincode.district = "";
      this.loading = false;
    }
  }
}

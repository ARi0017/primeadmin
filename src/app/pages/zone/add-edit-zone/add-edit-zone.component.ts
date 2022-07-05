import { Component, OnInit } from "@angular/core";
import { Zone } from 'src/app/model/zone.model';

import { CommonComponent } from "../../common/common.component";
import { ZoneService } from "src/app/services/zone.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-add-edit-zone',
  templateUrl: './add-edit-zone.component.html',
  styleUrls: ['./add-edit-zone.component.scss']
})
export class AddEditZoneComponent extends CommonComponent implements OnInit {
  zoneId: string;
  zone: Zone = new Zone();
  districts: string[];

  constructor(
    private zoneService: ZoneService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.zoneId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }


  ngOnInit(): void {
    this.populateDistricts();

    if(this.zoneId) {
      this.getZoneById();
    }
  }

  populateDistricts(): void {
    this.districts = this.zoneService.getWbDistricts();
  }

  addZone(): void {
    this.zoneService.addZone(this.zone)
      .subscribe((res) =>{
          this.message.success(res.message);
          this.router.navigate(["zones"]);
      });
  }

  getZoneById(): void {
    this.zoneService.getZoneById(this.zoneId)
      .subscribe((res) =>{
          this.zone = res.data;
      });
  }

  editZone(): void {
    this.zoneService.updateZone(this.zoneId, this.zone)
      .subscribe((res) =>{
          this.message.success(res.message);
          this.router.navigate(["zones"]);
      });
  }

}

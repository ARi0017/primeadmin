import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";
import { NzMessageService } from "ng-zorro-antd/message";

import { ZoneService } from "src/app/services/zone.service";
import { Zone } from "src/app/model/zone.model";

@Component({
  selector: 'app-zone',
  templateUrl: './zone.component.html',
  styleUrls: ['./zone.component.scss'],
})
export class ZoneComponent extends CommonComponent implements OnInit {
  allZones: Zone[] = [];
  total: number = 0;
  loading: boolean = false;

  constructor(
    private zoneService: ZoneService,
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

  getAllZones(): void {
    this.loading = true;

    this.zoneService.zoneList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allZones = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }
}

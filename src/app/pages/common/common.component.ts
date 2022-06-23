import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-common",
  templateUrl: "./common.component.html",
  styleUrls: ["./common.component.scss"],
})
export class CommonComponent implements OnInit {
  pageSize = 10;
  pageIndex = 1;
  sort: string = "-_id";
  filters: { key: string; value: any }[] = [];
  userRole: any;

  constructor(public auth: AuthService, public router: Router) {}

  ngOnInit(): void {}

  listConsent() {
    let role = this.auth.getUserRole().role.filter((a) => {
      return a.url == this.router.url;
    })[0];
    if (!role) {
      this.router.navigate(["/404"]);
      return;
    }
    this.userRole = role.permission;
  }

  addConsent() {
    let role = this.auth.getUserRole().role.filter((a) => {
      return this.router.url.match(a.url);
    })[0];
    if (!role.permission[1]) {
      this.router.navigate(["/404"]);
      return;
    }
  }

  editConsent() {
    let role = this.auth.getUserRole().role.filter((a) => {
      return this.router.url.match(a.url);
    })[0];
    if (!role.permission[2]) {
      this.router.navigate(["/404"]);
      return;
    }
  }

  onQueryParamsChange(params: NzTableQueryParams) {
    this.pageIndex = params.pageIndex;
    this.pageSize = params.pageSize;
    this.filters = params.filter;
    const currentSort = params.sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.sort = sortOrder
      ? sortOrder == "ascend"
        ? `${sortField}`
        : `-${sortField}`
      : "-_id";
  }
}

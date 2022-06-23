import { Component, OnInit } from "@angular/core";
import { NzTableQueryParams } from "ng-zorro-antd/table";
import { Router } from "@angular/router";
import { IRole } from "src/app/model/common.model";
import { NzMessageService } from "ng-zorro-antd/message";
import { UsersService } from "src/app/services/users.service";
import { CommonComponent } from "../common/common.component";
import { AuthService } from "src/app/services/auth.service";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-role",
  templateUrl: "./role.component.html",
  styleUrls: ["./role.component.scss"],
})
export class RoleComponent extends CommonComponent implements OnInit {
  allRole: IRole[];
  rolemaster: { label: string; value: any }[];
  id: any;
  total = 1;
  loading: boolean;

  constructor(
    private userService: UsersService,
    private message: NzMessageService,
    router: Router,
    auth: AuthService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.listConsent();
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {}

  //Get all roles list
  getRoleList() {
    this.loading = true;
    this.userService
      .getRole(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allRole = res.role;
        this.total = res.count;
        this.loading = false;
      });
  }

  //Change status of a Role
  onStatus(id: string) {
    if (!this.userRole[2]) return this.message.warning("Action not permitted");
    this.userService.updateRoleStatus(id).subscribe((res) => {
      this.message.success(res.message);
      this.getRoleList();
    });
  }

  //Delete a role
  onDelete(id: string) {
    this.userService.deleteRole(id).subscribe((res) => {
      this.message.success(res.message);
      this.getRoleList();
    });
  }
}

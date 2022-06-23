import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { User } from "src/app/model/user.model";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users.service";
import { CommonComponent } from "../common/common.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.scss"],
})
export class UsersComponent extends CommonComponent implements OnInit {
  allUser: User[];
  userlist: { label: string; value: any }[];
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

  ngOnInit(): void { }

  //Get all users-list
  getUserList() {
    this.loading = true;
    this.userService
      .userList(this.pageIndex, this.pageSize, this.sort)
      .subscribe((res) => {
        this.allUser = res.userList;
        this.total = res.count;
        this.loading = false;
      });
  }

  //Change status of a user
  onStatus(id: string) {
    if (!this.userRole[2]) return this.message.warning("Action not permitted");
    this.userService.updateStatus(id).subscribe((res) => {
      this.message.success(res.message);
      this.getUserList();
    });
  }

  //Delete one user
  onDelete(id: string) {
    this.userService.deleteUser(id).subscribe((res) => {
      this.message.success(res.message);
      this.getUserList();
    });
  }
}

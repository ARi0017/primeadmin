import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { IMenu } from "src/app/model/common.model";
import { AuthService } from "src/app/services/auth.service";
import { CommonService } from "src/app/services/common.service";
import { UsersService } from "src/app/services/users.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-role",
  templateUrl: "./add-role.component.html",
  styleUrls: ["./add-role.component.scss"],
})
export class AddRoleComponent extends CommonComponent implements OnInit {
  roleId: any;
  menu: IMenu[];
  roleForm: FormGroup;

  constructor(
    private userService: UsersService,
    private route: ActivatedRoute,
    router: Router,
    auth: AuthService,
    private message: NzMessageService,
    private common: CommonService,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.roleId = res.get("id");
    });

    this.roleForm = this.fb.group({
      name: ["", [Validators.required, Validators.pattern("^[a-zA-Z]+$")]],
      menu: this.fb.array([]),
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    this.getMenu();
    if (this.roleId) {
      this.getRolebyId();
      this.editConsent();
    } else {
      this.addConsent();
    }
  }

  get menuArray(): FormArray {
    return this.roleForm.get("menu") as FormArray;
  }

  //Add alternate slotes of a menu
  addAlternateSlots(menuId: string): FormGroup {
    return this.fb.group({
      menuId: menuId,
      view: [false],
      add: [false],
      edit: [false],
      delete: [false],
    });
  }

  //Get all menu list
  getMenu() {
    this.common.getMenu().subscribe((res) => {
      this.menu = res.data;
      this.menu.forEach((item) => {
        this.menuArray.push(this.addAlternateSlots(item._id));
      });
    });
  }

  //Get a role details by its id
  getRolebyId() {
    this.userService.getRolebyId(this.roleId).subscribe((res) => {
      this.roleForm.get("name").patchValue(res.name);
      res.menu.forEach((m) => {
        this.menuArray.controls
          .find((mA) => mA.value.menuId == m.menuId)
          .patchValue(m);
      });
    });
  }

  // Add or edit a role conditionaly
  addEditRole() {
    !this.roleId ? this.addRole() : this.updateRole();
  }

  //Add a new role
  addRole() {
    this.userService.addRole(this.roleForm.value).subscribe((res) => {
      this.message.success(res.message);
      this.router.navigate(["roles"]);
    });
  }

  //Update a role
  updateRole() {
    this.userService
      .updateRole(this.roleForm.value, this.roleId)
      .subscribe((res) => {
        this.message.success(res.message);
        this.router.navigate(["roles"]);
      });
  }

  //Check All
  checkAll(checked: boolean, i: number) {
    this.menuArray.controls[i].patchValue({
      view: checked,
      add: checked,
      edit: checked,
      delete: checked,
    });
  }
}

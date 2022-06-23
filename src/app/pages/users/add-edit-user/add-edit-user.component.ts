import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { User } from "src/app/model/user.model";
import { AuthService } from "src/app/services/auth.service";
import { UsersService } from "src/app/services/users.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-edit-user",
  templateUrl: "./add-edit-user.component.html",
  styleUrls: ["./add-edit-user.component.scss"],
})
export class AddEditUserComponent extends CommonComponent implements OnInit {
  id: string;
  roleList: { name: string; _id: string }[];
  userModel = new User("", "", "", "", "");
  validating: string = "";
  errorMsg: string = "";
  password: string = "";

  // options: NgPasswordValidatorOptions = {
  //   placement: "bottom",
  //   "animation-duration": 500
  // };

  defaultOptions = {
    "z-index": 0,
    "custom-class": "custom-class",
    shadow: true,
    offset: 8,
    heading: "Password Policy",
    successMessage: "Awesome! Password is Strong.",
    rules: {
      password: {
        type: "range",
        min: 6,
        max: 12,
      },
      "include-symbol": true,
      "include-number": true,
      "include-lowercase-characters": true,
      "include-uppercase-characters": true,
    },
  };
  validatingPhone: string;
  errorMsgPhone: string;

  constructor(
    private userService: UsersService,
    private message: NzMessageService,
    router: Router,
    auth: AuthService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.id = res.get("id");
      this.translate.setDefaultLang(localStorage.getItem("lang"));
    });
  }

  ngOnInit(): void {
    this.getRoles();
    if (this.id) {
      this.editConsent();
      this.getUser();
    } else {
      this.addConsent();
    }
  }

  //Get roles list
  getRoles() {
    this.userService.getRoleList().subscribe((res) => {
      this.roleList = res.role;
    });
  }

  //Store password in a virable
  onInput(event: any): void {
    this.password = event.target.value;
  }

  //Validating password
  isValid(event: boolean): void {
    if (this.password && this.password.length) {
      if (event) {
        this.message.success("Password is Valid.");
      } else {
        this.message.error("Password is invalid.");
      }
    }
  }

  //get an user details by its id
  getUser() {
    this.userService.getUser(this.id).subscribe((res) => {
      this.userModel = res;
    });
  }

  //Validating email
  checkEmail() {
    this.validating = "validating";
    this.userService.checkEmail(this.userModel.email).subscribe((res) => {
      if (res.message) this.validating = "error";
      else this.validating = "success";
      this.errorMsg = res.message;
    });
  }
  //Validating Phone
  checkPhone() {
    this.validatingPhone = "validating";
    this.userService.checkPhone(this.userModel.phone).subscribe((res) => {
      if (res.message) this.validatingPhone = "error";
      else this.validatingPhone = "success";
      this.errorMsgPhone = res.message;
    });
  }

  //Add or edit an user conditionaly
  onSubmit() {
    this.id ? this.updateUser() : this.addUser();
  }

  //Add a new user
  addUser() {
    this.userService.addUser(this.userModel).subscribe((res) => {
      this.message.success(res.message);
      this.router.navigate(["users"]);
    });
  }

  //Update an user
  updateUser() {
    this.userService.updateUser(this.id, this.userModel).subscribe((res) => {
      this.message.success(res.message);
      this.router.navigate(["users"]);
    });
  }
}

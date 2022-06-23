import { Component, OnInit } from "@angular/core";
import { AuthService } from "../../services/auth.service";
import { Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  isSingIn:boolean=true;
  email: string;
  password: string;
  newPassword: string = "";
  confirmPassword: string = "";

  constructor(
    private authService: AuthService,
    private router: Router,
    private message: NzMessageService
  ) {}

  ngOnInit() {
    localStorage.clear();
    localStorage.setItem("lang", "en");
  }
  
  //To login with email & password
  onSubmit() {
    // return (this.isPasswordReset = true);   
    this.authService.Login(this.email, this.password).subscribe((resData) => {
      //alert(JSON.stringify(resData.headers));
      //console.log(resData);
      const token = resData.headers.get("Authorization");
      if (token) {
        localStorage.setItem("token", token);
        this.isSingIn=false;
        this.router.navigate(["welcome"]);
        this.message.success(resData.body.message);
        return;
      }
      this.isSingIn = true;
      localStorage.clear();
      this.router.navigate(["/login"]);
    });
  }

  forgotPassButton(){

  }
}

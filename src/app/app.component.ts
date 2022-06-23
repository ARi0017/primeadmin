import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BnNgIdleService } from "bn-ng-idle";
import { AuthService } from "./services/auth.service";

@Component({
  selector: "app-root",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  constructor(
    private bnIdle: BnNgIdleService,
    private router: Router,
    private auth: AuthService
  ) {
    this.bnIdle.startWatching(3600).subscribe((res) => {
      if (res) {
        console.log("session expired");
        this.auth.logoutUser();
      }
    });
  }

  ngOnInit(): void {
    // this.auth.fetchUserIp().subscribe((res) => {
    //   localStorage.setItem("userIp", res.ip);
    // });
  }
}

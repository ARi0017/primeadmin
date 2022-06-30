import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: "app-default-layout",
  templateUrl: "./default-layout.component.html",
  styleUrls: ["./default-layout.component.scss"],
})
export class DefaultLayoutComponent implements OnInit {
  isCollapsed = false;
  userRole: any;
  isSettingsVisible: Boolean = true;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit(): void {
    this.userRole = this.auth.getUserRole();


  }

  logout() {
    localStorage.clear();
    this.router.navigate(["/login"]);
  }
}

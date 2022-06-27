import { Component, OnInit, ViewEncapsulation } from "@angular/core";
import { MenuService } from "src/app/services/menu.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import * as data from "../../../../../configuration.json";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";

@Component({
  selector: "app-add-edit-menu",
  templateUrl: "./add-edit-menu.component.html",
  styleUrls: ["../../../../../node_modules/quill/dist/quill.snow.css"],
  encapsulation: ViewEncapsulation.None,
})
export class AddEditMenuComponent extends CommonComponent implements OnInit {
  menuId: any;
  title: string;
  url: string;
  icon: string;
  category: string;
  priority: string;

  constructor(
    private menuService: MenuService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.menuId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }

  ngOnInit(): void {
    if (this.menuId) {
      this.editConsent();
      this.getMenuById();
    } else {
      this.addConsent();
    }
  }
  //To get edited menu details by its Id
  getMenuById() {
    this.menuService.getMenuById(this.menuId).subscribe((res) => {
      this.title = res.menu.title;
      this.url = res.menu.url;
      this.icon = res.menu.icon;
      this.category = res.menu.category;
      this.priority = res.menu.priority;
    });
  }
  
  //On pressing submit button it toggles between add Menu and edit Menu Option 
  addEditMenu() {
    !this.menuId ? this.addMenu() : this.editMenu();
  }

  //To Add a new menu
  addMenu() {
    let menuData = {
      title: this.title,
      url: this.url,
      icon: this.icon,
      category: this.category,
      priority: this.priority,
    };
    this.menuService.addMenu(menuData).subscribe((res) => {
      this.message.success(res.url);
      this.router.navigate(["menu"]);
    });
  }

  //To edit edit a menu
  editMenu() {
    let menuData = {
      title: this.title,
      url: this.url,
      icon: this.icon,
      category: this.category,
      priority: this.priority,
    };
    this.menuService.updateMenu(menuData, this.menuId).subscribe((res) => {
      this.message.success(res.message);
      this.router.navigate(["menu"]);
    });
  }
}

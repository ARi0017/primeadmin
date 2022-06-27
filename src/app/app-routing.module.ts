import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AuthenticationGuard } from "./guards/authentication.guard";
import { DefaultLayoutComponent } from "./layouts/default-layout.component";
import { P404Component } from "./pages/error/404.component";
import { P500Component } from "./pages/error/500.component";
import { LoginComponent } from "./pages/login/login.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/login" },
  {
    path: "login",
    component: LoginComponent,
    data: {
      title: "Login",
    },
  },
  {
    path: "",
    component: DefaultLayoutComponent,
    data: {
      title: "Home",
    },
    children: [
      {
        path: "welcome",
        loadChildren: () =>
          import("./pages/welcome/welcome.module").then((m) => m.WelcomeModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "banners",
        loadChildren: () =>
          import("./pages/banner/banner.module").then((m) => m.BannerModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "categories",
        loadChildren: () =>
          import("./pages/category/category.module").then((m) => m.CategoryModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "pincodes",
        loadChildren: () =>
          import("./pages/pincode/pincode.module").then((m) => m.PincodeModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "products",
        loadChildren: () =>
          import("./pages/product/product.module").then((m) => m.ProductModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "drivers",
        loadChildren: () =>
          import("./pages/driver/driver.module").then((m) => m.DriverModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "users",
        loadChildren: () =>
          import("./pages/users/users.module").then((m) => m.UsersModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "roles",
        loadChildren: () =>
          import("./pages/role/role.module").then((m) => m.RoleModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "menu",
        loadChildren: () =>
          import("./pages/menu/menu.module").then((m) => m.MenuModule),
        canActivate: [AuthenticationGuard],
      },
      {
        path: "404",
        component: P404Component,
        data: {
          title: "Page 404",
        },
      },
      {
        path: "500",
        component: P500Component,
        data: {
          title: "Page 500",
        },
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

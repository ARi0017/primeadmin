import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';
import { ForgotPasswordComponent } from './views/forgot-password/forgot-password.component';

import { LogoutComponent } from './views/logout/logout.component';

export const routes: Routes = [
 // {
  //  path: '',
  //  redirectTo: 'dashboard',
  //  pathMatch: 'full',
 // },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'logout',
    component: LogoutComponent,
    data: {
      title: 'Logout Page'
    }
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
    data: {
      title: 'Forgot Password Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule)
      },
      {
        path: 'products-list',
        loadChildren: () => import('./views/products/products.module').then(m => m.ProductsModule)
      },
      {
        path: 'categories-list',
        loadChildren: () => import('./views/categories/categories.module').then(m => m.CategoriesModule)
      },
      {
        path: 'driver-list',
        loadChildren: () => import('./views/driver/driver.module').then(m => m.DriverModule)
      },
      {
        path: 'retailer-list',
        loadChildren: () => import('./views/retailer/retailer.module').then(m => m.RetailerModule)
      },
      {
        path: 'retailerproduct-list',
        loadChildren: () => import('./views/retailerproduct/retailerproduct.module').then(m => m.RetailerproductModule)
      },
      {
        path: 'customer-list',
        loadChildren: () => import('./views/customer/customer.module').then(m => m.CustomerModule)
      },
      {
        path: 'bannermaster-list',
        loadChildren: () => import('./views/bannermaster/bannermaster.module').then(m => m.BannermasterModule)
      },
      {
        path: 'orders',
        loadChildren: () => import('./views/orders/orders.module').then(m => m.OrdersModule)
      },
      {
        path: 'pincode',
        loadChildren: () => import('./views/pincode/pincode.module').then(m => m.PincodeModule)
      },
      {
          path: 'tax&others',
          loadChildren: () => import('./views/miscellaneous/miscellaneous.module').then(m => m.MiscellaneousModule)
      },
      {
        path: 'cms',
        loadChildren: () => import('./views/cms/cms.module').then(m => m.CmsModule)
      },
      {
        path: 'orders/invoice/:id',
        loadChildren: () => import('./views/invoice/invoice.module').then(m => m.InvoiceModule)
      },
      {
        path: 'vehicles-list',
        loadChildren: () => import('./views/vehicles/vehicles.module').then(m => m.VehiclesModule)
      },
      {
        path: 'sale-register',
        loadChildren: () => import('./views/misreport/misreport.module').then(m => m.MisreportModule)
      },
      {
        path: 'commision-payable',
        loadChildren: () => import('./views/commission-payable/commission-payable.module').then(m => m.CommissionPayableModule)
      },
      {
        path: 'agent-tree',
        loadChildren: () => import('./views/agent-tree/agent-tree.module').then(m => m.AgentTreeModule)
      },
      {
        path: 'payment-receipt',
        loadChildren: () => import('./views/peymentreceipt/peymentreceipt.module').then(m => m.PeymentreceiptModule)
      },
      {
        path: 'performance-tracking',
        loadChildren: () => import('./views/performancetraking/performancetraking.module').then(m => m.PerformancetrakingModule)
      },
      {
        path:'vendor-payments',
        loadChildren: () => import('./views/vendor-payment/vendor-payment.module').then(m => m.VendorPaymentModule)
      },
      {
        path:'payouts',
        loadChildren: () => import('./views/withdrawal/withdrawal.module').then(m => m.WithdrawalModule)
      },
      {
        path:'past-withdrawals',
        loadChildren: () => import('./views/payment-complete/payment-complete.module').then(m => m.PaymentCompleteModule)
      },
      {
        path:'refund',
        loadChildren:()=>import('./views/refund/refund.module').then(m=>m.RefundModule)
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { DriverService } from '../../services/Driver/driver.service';
import { CustomerService } from '../../services/Customer/customer.service';
import { ProductService } from '../../services/Product/product.service';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  data: any;
  url: string;
  customerdata: object;
  driverdata: object;

  NewOrder:number=0;
  PendingOrder:number=0;
  TotalOrder:number=0;
  TotalCustomer:number=0;
  ActiveDriver:number=0;

  constructor(private orderService: OrderService,
    private router: Router,
    private toaster: ToasterService,private driverService: DriverService,private customerService: CustomerService,private productService: ProductService) {
  }
  ngOnInit() {
    this.getDashDetail();
    this.getOrders();
    this.getCustomers();
    this.getDriver();
  }
  getDashDetail(){
    this.productService.getDashDetail().subscribe(data => {
      console.log("Data", data.data);
      this.NewOrder = data.data[0].NewOrder;
      this.PendingOrder = data.data[0].PendingOrder;
      this.TotalOrder = data.data[0].TotalOrder;
      this.TotalCustomer = data.data[0].TotalCustomer;
      this.ActiveDriver = data.data[0].ActiveDriver;
    });
  }
  formatDate() {
    var date = new Date();
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
}
  getOrders(){
    const orders = {
      'ordernumber': '',
      'CustomerId': '',
      'CustomerName': '',
      'FromDate': this.formatDate(),
      'ToDate': this.formatDate(),
      'drivername': '',
      'DeliveryFromDate': '',
      'DeliveryToDate': '',
      'OrderStatusId': '',
      'PaymentModeId': '',
      'page': 1,
      'Size': 5
     };
     this.orderService.getOrders(orders).subscribe(data => {
      this.data = data.data;
    });
  }
   getDriver() {
    const driver = {
      "drivername":"",
      "Phone":"",
      "Email":"",
      "Address":"",
      "Pincode":"",
      "page":1,
      "Size":5
};
    this.driverService.getDriver(driver).subscribe(data => {
      this.driverdata = data.data;
      this.url = data.Imgurl;
//console.log(this.data);
    });
  }
  getCustomers() {
    const customer = {
      "customername":"",
      "customerphone":"",
      "DefaultAdderess":"",
      "email":"",
      "DefaultPincode":"",
      "OwnRefCode":"",
      "RefByCustomerName":"",
      "RefByCustomerPhone":"",
      "page":"1",
      "Size":"5"
    }
    this.customerService.getCustomerList(customer).subscribe(data => {
      this.customerdata = data.data;
    });
  }
}

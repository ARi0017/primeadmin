import { Component, OnInit } from '@angular/core';
import { ToasterService } from '../../services/toaster.service';
import { Router } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { DriverService } from '../../services/Driver/driver.service';
import { CustomerService } from '../../services/Customer/customer.service';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  data: any;
  url: string;
  customerdata: object;
  driverdata: object;
  constructor(private orderService: OrderService,
    private router: Router,
    private toaster: ToasterService,private driverService: DriverService,private customerService: CustomerService) {
  }
  ngOnInit() {
    this.getOrders();
    this.getCustomers();
    this.getDriver();
  }

  getOrders(){
    const orders = {
      'OrderNo': '',
      'CustomerId': '',
      'CustomerName': '',
      'FromDate': '',
      'ToDate': '',
      'DriverName': '',
      'DeliveryFromDate': '',
      'DeliveryToDate': '',
      'OrderStatusId': '',
      'PaymentModeId': '',
      'page': '1',
      'Size': '10'
     };
     this.orderService.getOrders(orders).subscribe(data => {
      this.data = data.data;
      //this.url = data.Imgurl;
//console.log(this.data);
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
      "Size":10
};
    this.driverService.getDriver(driver).subscribe(data => {
      this.driverdata = data.data;
      this.url = data.Imgurl;
//console.log(this.data);
    });
  }
  getCustomers() {
    const customer = {
"Name":"",
"Phone":"",
"DefaultAdderess":"",
"email":"",
"DefaultPincode":"",
"OwnRefCode":"",
"RefByCustomerName":"",
"RefByCustomerPhone":"",
"page":"1",
"Size":"10"
}
    this.customerService.getCustomerList(customer).subscribe(data => {
     // if(data.data[]){}
      this.customerdata = data.data;
     // this.url = data.Imgurl;
    });
  }
}

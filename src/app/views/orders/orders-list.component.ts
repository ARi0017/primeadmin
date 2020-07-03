import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { Category } from '../../models/category';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-orders-list',
 /* styleUrls: ['/orders.component.scss'],*/
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {
  data: any;
  driverdata: any;
  driverid: string;
  constructor(private orderService: OrderService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getOrders();
    this.getactivedriver();
  }

  search(name: string,drivername: string) {
    const order = {
      "OrderNo": name,
      "CustomerId":"",
      "CustomerName": "",
      "FromDate": "",
      "ToDate": "",
      "DriverName": drivername,
      "DeliveryFromDate": "",
      "DeliveryToDate": "",
      "OrderStatusId": "",
      "PaymentModeId": "",
      "Page": "1",
      "Size": "10"
    }
    this.orderService.getOrders(order).subscribe(data => {
      this.data = data.data;
    });
  }

getOrders() {
    const order = {
      "OrderNo": "",
      "CustomerId": "",
      "CustomerName": "",
      "FromDate": "",
      "ToDate": "",
      "DriverName": "",
      "DeliveryFromDate": "",
      "DeliveryToDate": "",
      "OrderStatusId": "",
      "PaymentModeId": "",
      "Page": "1",
      "Size": "10"
    }
    this.orderService.getOrders(order).subscribe(data => {
      this.data = data.data;
    });
  }
  mapdriver(orderid:string){
    const order = {
      "OrderId": orderid,
      "DriverId": this.driverid,
      "ModifiedBy": "1"
    }
    this.orderService.oderdrivermap(order).subscribe(data => {
      if (data.status == 200) {
        this.toaster.Success("Driver Mapped Successfully");
        this.router.navigate(["/order-list"]);
      }
    });
  }
getactivedriver(){
  this.orderService.getActiveDriver().subscribe(data => {
    this.driverdata = data.data;
  });
}

  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }
  // Change Status
  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }




}

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
  page: number = 1;
  count: number;
  ordernumber : any='';
  drivername : any='';
  constructor(private orderService: OrderService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    let initialOrders = {ordernumber: this.ordernumber, drivername: this.drivername, page: this.page}
    this.getOrders(initialOrders);
    this.getCount({drivername: this.drivername});
    this.getactivedriver();
  }

  search() {
    const order = {ordernumber:this.ordernumber,drivername:this.drivername,page : this.page};
    this.orderService.getOrders(order).subscribe(data => {
      this.data = data.data;
    });
  }

getOrders(orderInterface: {ordernumber: any, drivername: string, page: number}) {
    const order = orderInterface
    this.orderService.getOrders(order).subscribe(data => {
      this.data = data.data;
    });
  }

  getPagination(page: number){
    this.page = page;
    this.getOrders({ordernumber: this.ordernumber, drivername: this.drivername, page: this.page});
  }

  getCount(drivername: any) {
    this.orderService.getCount(drivername)
      .subscribe(res => {
        this.count = res.TotalOrderCount;
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

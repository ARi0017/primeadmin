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
  Driverid: string;
  page: number = 1;
  orderstatus: number = 0;
  count: number;
  ordernumber : any='';
  drivername : any='';
  constructor(private orderService: OrderService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getOrders(this.page);
    this.getactivedriver();
  }

getOrders(page: number) {
    let initialOrders = {ordernumber: this.ordernumber, drivername: this.drivername, OrderStatusId:this.orderstatus, page: page}
    this.orderService.getOrders(initialOrders).subscribe(data => {
      this.data = data.data;
      this.count = (this.data.length > 0) ? this.data[0].RowCount : 0;
      console.log("Total Row Count",this.count);
    });
    
  }

  getPagination(page: number){
    this.page = page;
    this.getOrders(this.page);
  }

  mapdriver(orderid:string, event:any){
    const order = {
      "OrderId": orderid,
      "DriverId": event.target.value,
      "ModifiedBy": "1"
    }
    console.log(order);
    this.orderService.oderdrivermap(order).subscribe(data => {
      if (data.status == 200) {
        this.toaster.Success("Driver Mapped Successfully");
        this.getOrders(this.page);
      }
    });
  }
getactivedriver(){
  this.orderService.getActiveDriver().subscribe(data => {
    this.driverdata = data.data;
  });
}

cancelOrder(OrderId: any, OrderStatusId: any) {   
    if (!confirm('Are You Sure ?')) {
      return;
    }
    const order = {
      'OrderId': OrderId,
      'OrderStatus': OrderStatusId,
      'CancelBy': '1'
     };
    this.orderService.cancelOrder(order).subscribe(data => {
      this.data = data.data;
      if (data.status == 200) {
        this.toaster.Success("Order cancelled.");
        this.getOrders(this.page);
      }
    });
  }


}

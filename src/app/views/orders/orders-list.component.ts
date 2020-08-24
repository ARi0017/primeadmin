import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { ToasterService } from '../../services/toaster.service';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-orders-list',
 /* styleUrls: ['/orders.component.scss'],*/
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {
  @ViewChild("myModal", { static: true }) myModal: ModalDirective;
  data: any=null;
  driverdata: any;
  Driverid: string;
  page: number = 1;
  orderstatus: number = 0;
  count: number;
  ordernumber : any='';
  drivername : any='';
  orderno:any="";
  customername:any="";
  customerremarks:any="";
  orderdetail:any="";
  PageSize:number=10;
  constructor(private orderService: OrderService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getOrders(this.page);
    this.getactivedriver();
  }

getOrders(page: number) {
    let initialOrders = {ordernumber: this.ordernumber, drivername: this.drivername, OrderStatusId:this.orderstatus, page: page, Size: this.PageSize}
    this.orderService.getOrders(initialOrders).subscribe(data => {
      this.data = data.data;
      this.count = (Object.keys(this.data).length > 0) ? this.data[0].RowCount : 0;
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
  GetCustomerRemarks(OrderNo:string, CustomerName:string, CustomerRemarks:string, OrderDetail:string){
    this.orderno = OrderNo;
    this.customername = CustomerName;
    this.customerremarks = CustomerRemarks;
    this.orderdetail = OrderDetail;
  }
  
  
master:object; detail:object; DeliveryTime:any = new Date();

  OrderWholeData(id: string) {
    const orderid = {"OrderId":id}
    // const orderid = {"OrderId":171}
    this.orderService.getOrderWholeData(orderid).subscribe(data => {
      if (data) {
          this.master = data.master[0];
          console.log("Master",this.master);
          this.detail = data.detail;
          console.log("Detail",data.detail);
        }
        else {
          this.toaster.Error("Couldn't fetch detail, server error");
        }
    });
  }
  print(): void {
    let newWin;
    var divToPrint = document.getElementById("invoice-POS");  
    newWin = window.open("");  
    newWin.document.write(divToPrint.outerHTML);  
    newWin.print();  
    newWin.close(); 
}
}

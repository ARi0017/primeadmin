import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { OrderService } from '../../services/Order/order.service';
import { ToasterService } from '../../services/toaster.service';
import { BsModalRef, BsModalService, ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-orders-list',
 /* styleUrls: ['/orders.component.scss'],*/
  templateUrl: './orders-list.component.html'
})
export class OrdersListComponent implements OnInit {
  @ViewChild("myModal", { static: true }) myModal: ModalDirective;
  @ViewChild("myModal5", {static: true}) myModal5: ModalDirective;
  modalRef: BsModalRef;
  data: any=null;
  driverdata: any;
  Driverid: string; 
  page: number = 1;
  orderstatus: number = 0;
  count: number;
  ordernumber : any='';
  customername : any='';
  drivername : any='';
  vehicle : any='';
  orderno:any="";
  customerremarks:any="";
  orderdetail:any="";
  PageSize:number=10;
  orderReview: any;
  expectTime : Date;
  constructor(private orderService: OrderService, private router: Router, private toaster: ToasterService, private modalService: BsModalService) {
  }

  ngOnInit() {
    this.getOrders(this.page);
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

getOrders(page: number) {
    let initialOrders = {ordernumber: this.ordernumber, CustomerName: this.customername, drivername: this.drivername, VehicleRegNo: this.vehicle, OrderStatusId:this.orderstatus, page: page, Size: this.PageSize}
    this.orderService.getOrders(initialOrders).subscribe(data => {
      console.log(data)
      this.data = data.data;
      this.count = (Object.keys(this.data).length > 0) ? this.data[0].RowCount : 0;
      console.log("Total Row Count",this.count);
    });

  }

  getPagination(page: number){
    this.page = page;
    this.getOrders(this.page);
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

  customerReview(OrderReview: any) {
    this.orderReview = OrderReview
  }

  GetCustomerRemarks(OrderNo:string, CustomerName:string, CustomerRemarks:string, OrderDetail:string){
    this.orderno = OrderNo;
    this.customername = CustomerName;
    this.customerremarks = CustomerRemarks;
    this.orderdetail = OrderDetail;
  }


master:object; detail:object; DeliveryTime:any = new Date();

  OrderWholeData(id: string) {
  console.log(id)
    const orderid = {"OrderId":id}
    // const orderid = {"OrderId":171}
    this.orderService.getOrderWholeData(orderid).subscribe(data => {
      if (data) {
          this.master = data.master[0];
          console.log("Master",this.master);
          this.detail = data.detail;
         // localStorage.setItem('OrderId', this.master.OrderNo);
          console.log("Detail",data.detail);
        }
        else {
          this.toaster.Error("Couldn't fetch detail, server error");
        }
    });
  }
  print(id:string): void {
  
    //localStorage.setItem('OrderId', data.data[0][0].FullName);
    //let newWin;
    //var divToPrint = document.getElementById("invoice-POS");
    //newWin = window.open("");
    //newWin.document.write(divToPrint.outerHTML);
    //newWin.print();
    //newWin.close();
}
expectedTimeDelivery(id:any,expect:any){
  console.log("id",id)
  console.log("ExpectedTime",expect)
  var addData = {
    "OrderId":id,
    "expectedTime":expect
  }
  this.orderService.expectedDeliveryTimeUpdate(addData).subscribe(data => {
    if (data.status == 200) {
      this.toaster.Success("Delivery Time Sucessfully Updated!!");
      this.ngOnInit();
    }
    else
      this.toaster.Error("Something went wrong.");
  });
}
}

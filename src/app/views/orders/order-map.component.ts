import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/Order/order.service';
import { ToasterService } from '../../services/toaster.service';
import { VehicleService } from '../../services/Vehicle/vehicle.service';

@Component({
  selector: 'app-order-map',
  templateUrl: './order-map.component.html',
  styleUrls: ['./order-map.component.scss']
})
export class OrderMapComponent implements OnInit {
  data: any=null; driverdata: any=null; vehicledata: any=null; routedata: any=null;
  Route: any=''; ordernumber : any=''; customername : any=''; drivername : any=''; vehicle : any='';
  chkHead: boolean=false; chkAll: boolean=false;
  orderSelectedList: any = []; orderSelectedStr: string = ''; selectDriverId:any=null; selectVehicleId:any=null;
  constructor(private orderService: OrderService, public vehicleService: VehicleService, private toaster: ToasterService) { }

  ngOnInit() {
    this.getOrders();
  }
  loadData(){
    this.getOrders();
  }
  loadFlag:number=0;
  clearSelection(){
    this.chkHead =false; this.chkAll =false;
    this.orderSelectedList = []; this.orderSelectedStr = ''; this.selectDriverId =null; this.selectVehicleId =null;
  }
  getOrders() {
    let initialOrders = {Route: this.Route, ordernumber: this.ordernumber, CustomerName: this.customername, drivername: this.drivername, VehicleRegNo: this.vehicle}
    this.orderService.getOrdersForDriverVehicleMap(initialOrders).subscribe(data => {
      this.data = data.data;
      if (data.data!=null && this.loadFlag==0){
        this.getroutelist();
        this.getactivedriver();
        this.getactivevehicle();
        this.loadFlag=1;
      }
      this.clearSelection();
    });    
  }
  getactivedriver(){
    this.orderService.getActiveDriver().subscribe(data => {
      this.driverdata = data.data;
    });
  }

  getactivevehicle(){
    this.vehicleService.activeVehiclesList().subscribe(data => {
      this.vehicledata = data.data;
    });
  }

  getroutelist(){
    this.orderService.getRouteList().subscribe(data => {
      this.routedata = data.data;
    });
  }

  mapDriver(orderid:string, event:any){
    const order = {
      "OrderId": orderid,
      "DriverId": event.target.value,
      "ModifiedBy": "1"
    }
    console.log(order);
    this.orderService.orderdrivermap(order).subscribe(data => {
      if (data.status == 200) {
        this.toaster.Success("Driver Mapped Successfully");
        this.getOrders();
      }
      else
        this.toaster.Error("Something went wrong.");
    });
  }

  mapVehicle(orderid:string, event:any){
    const order = {
      "OrderId": orderid,
      "VehicleId": event.target.value,
      "ModifiedBy": "1"
    }
    console.log(order);
    this.orderService.ordervehiclemap(order).subscribe(data => {
      if (data.status == 200) {
        this.toaster.Success("Vehicle Mapped Successfully");
        this.getOrders();
      }
      else
        this.toaster.Error("Something went wrong.");
    });
  }

  chekUncheck(eve:any){
    this.chkAll = eve.target.checked;
    this.chkHead = eve.target.checked;
    if (eve.target.checked){
      this.orderSelectedList = [];
      for (var i=0; i < Object.keys(this.data).length; i++){
        this.orderSelectedList.push(this.data[i].OrderId)
      }
    }
    else
      this.orderSelectedList = [];
    console.log("Select All list: ",this.orderSelectedList);
    this.setSelectedOrdeStr();
  }

  chekUncheckHead(orderid:string, eve:any){
    console.log(orderid, eve.target.checked);
    if (!eve.target.checked)
      this.chkHead = eve.target.checked;
    console.log("On Orderd: ",orderid);
    if (!eve.target.checked){
      const index: number = this.orderSelectedList.indexOf(orderid);
      if (index !== -1) {
          this.orderSelectedList.splice(index, 1);
      }  
    }
    else{
      console.log(this.orderSelectedList, orderid);
      this.orderSelectedList.push(orderid)
    }
    // this.orderSelected.filter(item => item !== orderid);
    console.log("Select After unselect list: ",this.orderSelectedList);
    this.setSelectedOrdeStr();
  }

  setSelectedOrdeStr(){
    this.orderSelectedStr = '';
    this.orderSelectedStr = this.orderSelectedList.toString();
    console.log("Select After unselect string: ",this.orderSelectedStr)
  }

  mapDriverVehicleBulk(){
    const order = {
      "OrderIds": this.orderSelectedStr,
      "DriverId": this.selectDriverId,
      "VehicleId": this.selectVehicleId,
      "ModifiedBy": "1"
    }
    console.log(order);
    this.orderService.orderdrivervehiclemap(order).subscribe(data => {
      if (data.status == 200) {
        this.toaster.Success("Driver & Vehicle Mapped Successfully");
        this.getOrders();
      }
      else
        this.toaster.Error("Something went wrong.");
    });
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

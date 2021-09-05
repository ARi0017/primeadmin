import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/Order/order.service'
import { ToasterService } from '../../../services/toaster.service';
@Component({
  selector: 'app-finalorder',
  templateUrl: './finalorder.component.html',
  styleUrls: ['./finalorder.component.scss']
})
export class FinalorderComponent implements OnInit {
  resData : any;
  resPaymentData : any;
  finalresPaymentData : any = {};
  constructor(
    private orderService : OrderService,
    private toasterService : ToasterService,
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData(){
    this.orderService.paymentList().subscribe((res)=>{
      if(res.status == "200"){
        this.resData = res.data
        console.log(this.resData)
      }
    })
  }
  getpaymentDetailsByBank(trakingCode:any,orderCode:any){
    var addData = {
      "reference_no":trakingCode,
      "order_no":orderCode
    }
    this.orderService.orderStatusByBank(addData).subscribe((res)=>{
      if(res.status == "200"){
        this.resPaymentData = JSON.parse(res.data)
        this.finalresPaymentData = this.resPaymentData.Order_Status_Result
        console.log(this.finalresPaymentData)
      }
    })
  }
}

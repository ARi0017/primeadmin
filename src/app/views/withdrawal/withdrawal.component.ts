import { Component, OnInit } from '@angular/core';
import { WithdrawalService } from '../../services/withdrawal/withdrawal.service';
import { CustomerService } from '../../services/Customer/customer.service';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-withdrawal',
  templateUrl: './withdrawal.component.html',
  styleUrls: ['./withdrawal.component.scss']
})
export class WithdrawalComponent implements OnInit {
  data : any
  check : any = null;
  customerData : any;
  constructor(
    private withdrawalService : WithdrawalService,
    private customerService: CustomerService,
    private toaster: ToasterService
  ) { }

  ngOnInit() {
   
   this.customerListForPayout()
  }
  customerListForPayout(){
    this.customerService.customerListForPayout().subscribe(res=>{
      this.customerData = res.data
      console.log(this.customerData)
    })
  }
  withdrawalList(customerId:any){
    var addData = {
      'customerId':customerId
    }
    console.log(addData)
    this.withdrawalService.withdrawalList(addData).subscribe(res=>{
      this.data = res.data;
      console.log(this.data)
    })
  }
  checkButton(TranId:any,Name:any,Phone:any,TranOn:any,Remarks:any){
    var addData = {
      "TranId":TranId,
      "IsSelected":"1"
    }
   this.withdrawalService.withdrawalSelected(addData).subscribe(res=>{
     if(res.status==200){
       this.ngOnInit()
     }else{
      this.ngOnInit()
     }
   })

  }
  checkButton2(TranId:any){
    var addData = {
      "TranId":TranId,
      "IsSelected":"0"
    }
   this.withdrawalService.withdrawalSelected(addData).subscribe(res=>{
     if(res.status==200){
       this.ngOnInit()
     }else{
      this.ngOnInit()
     }
   })
  }
  withdrawalRequestByAdmin(customerId:any){
    if (!confirm("Please Check the customer Wallet balance and bank account!!!")) {
      return;
    }
    var addData = {
      'customerId':customerId
    }
    console.log(addData)
    this.withdrawalService.withdrawalRequest(addData).subscribe(res=>{
      if(res.status=="400"){
        this.toaster.Error(res.message);
      }
      if(res.status=="200"){
        this.toaster.Success("Payout Sucessfully Done!!");
      }
    })
  }

}

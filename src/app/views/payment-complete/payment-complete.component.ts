import { Component, OnInit } from '@angular/core';
import { WithdrawalService } from '../../services/withdrawal/withdrawal.service';
@Component({
  selector: 'app-payment-complete',
  templateUrl: './payment-complete.component.html',
  styleUrls: ['./payment-complete.component.scss']
})
export class PaymentCompleteComponent implements OnInit {
  data : any
  check : any = null;
  customerData : any;
  constructor(
    private widthdrawalService : WithdrawalService
  ) { }

  ngOnInit() {
    this.paymentComplete()
  }
  paymentComplete(){
    this.widthdrawalService.paymentComplete().subscribe(res=>{
      this.customerData = res.data
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { TaxCategoryService } from '../../services/TaxCategory/tax-category.service';
@Component({
  selector: 'app-commission-payable',
  templateUrl: './commission-payable.component.html',
  styleUrls: ['./commission-payable.component.scss']
})
export class CommissionPayableComponent implements OnInit {
  saleRegister:any =[];
  daterangepickerModel = new Date();
  NOACommission : any = 0;
  commissionObject : any = {};
  commissionArr : any = [];
  constructor(
    private TaxService : TaxCategoryService,
  ) { }

  ngOnInit() {
    const fromDate = new Date(this.daterangepickerModel).toISOString().slice(0, 19).replace('T', ' ');
    const toDate = new Date(this.daterangepickerModel).toISOString().slice(0, 19).replace('T', ' ');
    var addData = {
      'fromDate':fromDate,
      'toDate':toDate,
      'firstLoading':1

    }

    console.log(addData)
    this.TaxService.CommissionPayable(addData).subscribe(data => {
      this.saleRegister = data.data
      this.NOACommission = data.NOACommission
    })

  }
  getData(){
    var fromDateData = this.daterangepickerModel[0]
    var toDateData = this.daterangepickerModel[1]
    console.log(fromDateData, toDateData)
    const fromDate = new Date(fromDateData).toISOString().slice(0, 19).replace('T', ' ');
    const toDate = new Date(toDateData).toISOString().slice(0, 19).replace('T', ' ');
    var addData = {
      'fromDate':fromDate,
      'toDate':toDate

    }

    console.log(addData)
    this.TaxService.CommissionPayable(addData).subscribe(data => {
      this.saleRegister = data.data
      this.NOACommission = data.NOACommission
      console.log(this.saleRegister)
      for(var i of this.saleRegister){
        if(i.Remarks == "OA Commision added to customer wallet"){
          this.commissionObject["AdminTranFlag"] = i.AdminTranFlag;
          this.commissionObject["AgentCode"] = i.AgentCode
          this.commissionObject["AgentName"] = i.AgentName
          this.commissionObject["oaCommissionAmount"] = i.Amount
          this.commissionObject["NetSale"] = i.NetSale
          this.commissionObject["oaProductsSubtotal"] = i.AlibabaProducts.SubTotal
          this.commissionObject["totalCommission"] += i.Amount
          this.commissionObject["OrderId"] = i.OrderId
          this.commissionObject["OrderNo"] = i.OrderNo
          this.commissionObject["Remarks"] = i.Remarks
          this.commissionObject["SubAgentCode"] = i.SubAgentCode
          this.commissionObject["TranId"] = i.TranId
          this.commissionObject["TranOn"] = i.TranOn
          this.commissionArr.push(this.commissionObject)
        }else{
          this.commissionObject["AdminTranFlag"] = i.AdminTranFlag;
          this.commissionObject["AgentCode"] = i.AgentCode
          this.commissionObject["AgentName"] = i.AgentName
          this.commissionObject["noaCommissionAmount"] = i.Amount
          this.commissionObject["NetSale"] = i.NetSale
          this.commissionObject["noaProductsSubtotal"] = i.NonAlibabaProducts.SubTotal
          this.commissionObject["OrderId"] = i.OrderId
          this.commissionObject["OrderNo"] = i.OrderNo
          this.commissionObject["Remarks"] = i.Remarks
          this.commissionObject["SubAgentCode"] = i.SubAgentCode
          this.commissionObject["TranId"] = i.TranId
          this.commissionObject["TranOn"] = i.TranOn
          this.commissionArr.push(this.commissionObject)
        }
      }
      console.log(this.commissionArr)
    })
  }

}

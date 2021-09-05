import { Component, OnInit } from '@angular/core';
import { TaxCategoryService } from '../../services/TaxCategory/tax-category.service';
@Component({
  selector: 'app-peymentreceipt',
  templateUrl: './peymentreceipt.component.html',
  styleUrls: ['./peymentreceipt.component.scss']
})
export class PeymentreceiptComponent implements OnInit {
  daterangepickerModel = new Date();
  TotalSubTotal:any = 0;
  NetSalePaymentReceipt : any = 0 ;
  TotalGstAmount:any = 0 ;
  TotalOrderTotalWithGst : any = 0 ;
  TotalDiscount : any = 0 ;
  DeliveryAmount :any = 0 ;
  NetSalePrice : any = 0 ;
  NOACommission :any =0;
  OACommission : any =0 ;
  TotalCommission : any = 0;
  sale : any = 0;
  constructor(
    private TaxService : TaxCategoryService,
  ) { }

  ngOnInit() {
    this.getData()
  }
  getData(){
    var fromDateData = this.daterangepickerModel[0]
    var toDateData = this.daterangepickerModel[1]
    const fromDate = new Date(fromDateData).toISOString().slice(0, 19).replace('T', ' ');
    const toDate = new Date(toDateData).toISOString().slice(0, 19).replace('T', ' ');
    var addData = {
      'fromDate':fromDate,
      'toDate':toDate

    }
    this.TaxService.paymentReceiptAndPayable(addData).subscribe(data => {
      this.TotalSubTotal = data.TotalSubTotal
      this.TotalGstAmount = data.TotalGstAmount
      this.TotalOrderTotalWithGst = data.TotalOrderTotalWithGst
      this.TotalDiscount = data.TotalDiscount
      this.DeliveryAmount = data.DeliveryAmount
      this.NetSalePrice = data.NetSalePrice
      this.sale = this.TotalSubTotal + this.TotalDiscount
      console.log(data)

    })
    this.TaxService.paymentReceiptAndPayableForCommission(addData).subscribe(data => {
      this.NOACommission = data.NOARetailerCommission;
      this.OACommission = data.OARetailerCommission;
      this.TotalCommission = data.TotalCommission;

    })
  }


}

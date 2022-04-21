import { Component, OnInit } from '@angular/core';
import { TaxCategoryService } from '../../services/TaxCategory/tax-category.service';
import { ExcelService } from '../../services/Excel/excel.service';
@Component({
  selector: 'app-misreport',
  templateUrl: './misreport.component.html',
  styleUrls: ['./misreport.component.scss']
})
export class MisreportComponent implements OnInit {
  daterangepickerModel = new Date();
  saleRegisterOld : any = [] ;
  saleRegister : any = [];
  alibabaProductSubTotal : any = 0;
  nonalibabaProductSubTotal : any = 0;
  alibabaProductTotalWithGst :any = 0;
  nonAlibabaProductTotalWithGst :any = 0;
  totalGst : any = 0;
  totalDeliveryCharges :any =0;
  totalDiscount :any =0 ;
  netBusiness : any = 0;
  constructor(
   private TaxService : TaxCategoryService,
   private excelService:ExcelService
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
    this.TaxService.DailySaleRegister(addData).subscribe(data => {
      this.saleRegisterOld = data.data;
      
      for(var i of this.saleRegisterOld){
        
        var dataObj = {}
        dataObj["OrderId"] = i.OrderId
        dataObj["OrderNo"] = i.OrderNo
        dataObj["OrderedOn"] = i.OrderedOn
        dataObj["OrderStatusId"] = i.OrderStatusId
        dataObj["CustomerName"] = i.CustomerName
        dataObj["CustomerPhone"] = i.CustomerPhone
        dataObj["CustomerAddress"] = i.Address
        dataObj["CustomerLandmark"] = i.Landmark
        dataObj["CustomerPincode"] = i.Pincode
        dataObj["AlibabaProductSubTotal"] = i.AlibabaProducts.SubTotal
        dataObj["AlibabaProductTotalGst"] = i.AlibabaProducts.TotalWithGst
        dataObj["AlibabaProductTotalGstWithPrice"] = i.AlibabaProducts.TotalWithGstprice
        dataObj["NonAlibabaProductSubTotal"] = i.NonAlibabaProducts.SubTotal
        dataObj["NonAlibabaProductTotalGst"] = i.NonAlibabaProducts.TotalWithGst
        dataObj["NonAlibabaProductTotalGstWithPrice"] = i.NonAlibabaProducts.TotalWithGstprice
        dataObj["TotalGst"] = i.TaxAmt
        dataObj["DeliveryAmt"] = i.DeliveryAmt
        dataObj["Discount"] = i.Discount
        dataObj["PaymentMode"] = i.PaymentMode
        this.alibabaProductSubTotal += i.AlibabaProducts.SubTotal
        this.nonalibabaProductSubTotal += i.NonAlibabaProducts.SubTotal
        this.alibabaProductTotalWithGst += i.AlibabaProducts.TotalWithGstprice
        this.nonAlibabaProductTotalWithGst += i.NonAlibabaProducts.TotalWithGstprice
        this.totalGst += i.TaxAmt
        this.totalDeliveryCharges += i.DeliveryAmt
        this.totalDiscount += i.Discount
        this.netBusiness += i.AlibabaProducts.SubTotal + i.NonAlibabaProducts.SubTotal + i.DeliveryAmt
        dataObj["NetBusiness"] = i.NetBusiness
        dataObj["NetIncome"] = this.alibabaProductSubTotal + this.nonalibabaProductSubTotal
        dataObj["DriverName"] = i.DriverName
        dataObj["DriverPhone"] = i.DriverPhone
        
        this.saleRegister.push(dataObj)
      }
      
      // this.excelService.exportAsExcelFile(this.saleRegister, 'sale-register-alibaba');
      
      // this.saleRegister.length = 0;
    })

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
    console.log(addData)
    this.TaxService.DailySaleRegister(addData).subscribe(data => {
      this.saleRegisterOld = data.data;
      
      for(var i of this.saleRegisterOld){
        
        var dataObj = {}
        dataObj["OrderId"] = i.OrderId
        dataObj["OrderNo"] = i.OrderNo
        dataObj["OrderedOn"] = i.OrderedOn
        dataObj["OrderStatusId"] = i.OrderStatusId
        dataObj["CustomerName"] = i.CustomerName
        dataObj["CustomerPhone"] = i.CustomerPhone
        dataObj["CustomerAddress"] = i.Address
        dataObj["CustomerLandmark"] = i.Landmark
        dataObj["CustomerPincode"] = i.Pincode
        dataObj["AlibabaProductSubTotal"] = i.AlibabaProducts.SubTotal
        dataObj["AlibabaProductTotalGst"] = i.AlibabaProducts.TotalWithGst
        dataObj["AlibabaProductTotalGstWithPrice"] = i.AlibabaProducts.TotalWithGstprice
        dataObj["NonAlibabaProductSubTotal"] = i.NonAlibabaProducts.SubTotal
        dataObj["NonAlibabaProductTotalGst"] = i.NonAlibabaProducts.TotalWithGst
        dataObj["NonAlibabaProductTotalGstWithPrice"] = i.NonAlibabaProducts.TotalWithGstprice
        dataObj["TotalGst"] = i.TaxAmt
        dataObj["DeliveryAmt"] = i.DeliveryAmt
        dataObj["Discount"] = i.Discount
        dataObj["PaymentMode"] = i.PaymentMode
        this.alibabaProductSubTotal += i.AlibabaProducts.SubTotal
        this.nonalibabaProductSubTotal += i.NonAlibabaProducts.SubTotal
        this.alibabaProductTotalWithGst += i.AlibabaProducts.TotalWithGstprice
        this.nonAlibabaProductTotalWithGst += i.NonAlibabaProducts.TotalWithGstprice
        this.totalGst += i.TaxAmt
        this.totalDeliveryCharges += i.DeliveryAmt
        this.totalDiscount += i.Discount
        dataObj["NetIncome"] = this.alibabaProductSubTotal + this.nonalibabaProductSubTotal
        dataObj["DriverName"] = i.DriverName
        dataObj["DriverPhone"] = i.DriverPhone
        
        this.saleRegister.push(dataObj)
      }
      
      // this.excelService.exportAsExcelFile(this.saleRegister, 'sale-register-alibaba');
      
      // this.saleRegister.length = 0;
    })
  }
  // organise(arr:any) {
  //   var headers = [], // an Array to let us lookup indicies by group
  //     objs = [],    // the Object we want to create
  //     i, j;
  //   for (i = 0; i < arr.length; ++i) {
  //     j = headers.indexOf(arr[i].id); // lookup
  //     if (j === -1) { // this entry does not exist yet, init
  //       j = headers.length;
  //       headers[j] = arr[i].id;
  //       objs[j] = {};
  //       objs[j].id = arr[i].id;
  //       objs[j].data = [];
  //     }
  //     objs[j].data.push( // create clone
  //       {
  //         case_worked: arr[i].case_worked,
  //         note: arr[i].note, id: arr[i].id
  //       }
  //     );
  //   }
  //   return objs;
  // }

}

import { Component, OnInit } from '@angular/core';
import { TaxCategoryService } from '../../services/TaxCategory/tax-category.service';
@Component({
  selector: 'app-performancetraking',
  templateUrl: './performancetraking.component.html',
  styleUrls: ['./performancetraking.component.scss']
})
export class PerformancetrakingComponent implements OnInit {
  daterangepickerModel = new Date();
  saleRegisterOld : any = [] ;
  performanceTrackingData : any = [];
  alibabaProductSubTotal : any = 0;
  nonalibabaProductSubTotal : any = 0;
  alibabaProductTotalWithGst :any = 0;
  nonAlibabaProductTotalWithGst :any = 0;
  totalGst : any = 0;
  totalDeliveryCharges :any =0;
  totalDiscount :any =0 ;
  deliveryId : any;
  finalDistanceCalculationS = 0;
  drivers : any;
  constructor(
    private taxCategory : TaxCategoryService
  ) { }

  ngOnInit() {
    this.taxCategory.allDriver().subscribe((res)=>{
      this.drivers = res.data
    })
    // const fromDate = new Date(this.daterangepickerModel).toISOString().slice(0, 19).replace('T', ' ');
    // const toDate = new Date(this.daterangepickerModel).toISOString().slice(0, 19).replace('T', ' ');
    // var addData = {
    //   fromDate :fromDate,
    //   toDate :toDate ,
    //   deliveryId : this.deliveryId
    // }
    // console.log(addData)
    // this.taxCategory.performanceTraking(addData).subscribe(data => {
    //   this.performanceTrackingData = data.data
    //   this.finalDistanceCalculationS = data.finalDistanceCalculation
    //   console.log(data)
    // })
  }
  getData(){
    var fromDateData = this.daterangepickerModel[0]
    var toDateData = this.daterangepickerModel[1]
    const fromDate = new Date(fromDateData).toISOString().slice(0, 19).replace('T', ' ');
    const toDate = new Date(toDateData).toISOString().slice(0, 19).replace('T', ' ');

    var addData = {
      fromDate :fromDate,
      toDate :toDate ,
      deliveryId : this.deliveryId
    }
   
    this.taxCategory.performanceTraking(addData).subscribe(data => {
      this.performanceTrackingData = data.data
      this.finalDistanceCalculationS = data.finalDistanceCalculation
      console.log(data)
    })
    console.log("Yes")
  }

}
 
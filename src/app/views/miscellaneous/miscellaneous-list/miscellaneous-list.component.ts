import { Component, OnInit, Input } from '@angular/core';
import { MiscellaneousService } from '../../../services/miscellaneous/miscellaneous.service';
import { ToasterService } from '../../../services/toaster.service';
import { Router } from '@angular/router';
import { Miscellaneous } from '../../../models/miscellaneous';
import { ProductService } from '../../../services/Product/product.service';
import { TaxCategory } from '../../../models/taxcategory';
import { TaxCategoryService } from '../../../services/TaxCategory/tax-category.service';

@Component({
  selector: 'app-miscellaneous-list',
  templateUrl: './miscellaneous-list.component.html',
  styleUrls: ['./miscellaneous-list.component.scss']
})
export class MiscellaneousListComponent implements OnInit {
  data: any;
  page: number = 1;
  count: number;
  // taxcategory: Array<{ TaxCategoryId: any, TaxCategory: any, Percentage: any, IsActive: any, Description: string }>;
  taxcategory: any;
  TaxCategory = new TaxCategory(0,'',1,'','1',1);
  constructor(private miscService: MiscellaneousService, private taxService: TaxCategoryService,private toaster: ToasterService, private router: Router, private productService: ProductService) { }
  DefaultDiscountRate: number = 0;
  SpecialDiscountRate: number = 0;
  DefaultTaxRate: number = 0;
  SpecialTaxRate: number = 0;
  DefaultDeliveryCharge:number = 0;
  WalletDeductionRateOnOrder: number = 0;
  SpecialDeliveryRate: number = 0;
  WelcomeWalletAmt:number = 0;
  OrderReturnCommRateOA:number = 0;
  RefByAddCommRate: number = 0;
  OrderReturnCommRateNOA: number = 0;
  ModifiedBy: number = 1;





  ngOnInit() {
    // this.getMisc(this.page)
    this.miscService.getMisc().subscribe(data => {
      console.log(data)
      this.DefaultDiscountRate = data.data[0].DefaultDiscountRate;
      this.SpecialDiscountRate = data.data[0].SpecialDiscountRate;
      this.DefaultTaxRate = data.data[0].DefaultTaxRate;
      this.SpecialTaxRate = data.data[0].SpecialTaxRate;
      this.OrderReturnCommRateNOA = data.data[0].OrderReturnCommRateNOA;
      this.WalletDeductionRateOnOrder = data.data[0].WalletDeductionRateOnOrder;
      this.DefaultDeliveryCharge = data.data[0].DefaultDeliveryCharge;
      this.SpecialDeliveryRate = data.data[0].SpecialDeliveryRate;
      this.WelcomeWalletAmt = data.data[0].WelcomeWalletAmt;
      this.OrderReturnCommRateOA = data.data[0].OrderReturnCommRateOA;
      this.RefByAddCommRate = data.data[0].RefByAddCommRate;
    });
    this.getTaxCategories();
  }
  getTaxCategories(){
    this.taxService.getTaxCategories().subscribe(data => {
      this.taxcategory = data.data;
      console.log(this.taxcategory);
    });
  }

addNewTaxCategory(){
  this.TaxCategory = new TaxCategory(0,'',1,'','1',1);
  this.taxcategory.push(this.TaxCategory);
}
// removeTaxCategory(i){
//   console.log("index",i);
//   this.taxcategory.splice(i, 1);
// }
   updateValues() {

    const Misc = {
      DefaultDiscountRate: this.DefaultDiscountRate,
      SpecialDiscountRate: this.SpecialDiscountRate,
      DefaultTaxRate: this.DefaultTaxRate,
      SpecialTaxRate: this.SpecialTaxRate,
      DefaultDeliveryCharge: this.DefaultDeliveryCharge,
      SpecialDeliveryRate: this.SpecialDeliveryRate,
      OrderReturnCommRateNOA: this.OrderReturnCommRateNOA,
      WalletDeductionRateOnOrder: this.WalletDeductionRateOnOrder,
      WelcomeWalletAmt: this.WelcomeWalletAmt,
      OrderReturnCommRate: this.OrderReturnCommRateOA,
      RefByAddCommRate: this.RefByAddCommRate,
      ModifiedBy: this.ModifiedBy
    }
    this.miscService.editMisc(Misc).subscribe(res => {
      console.log('edit data',res);
      const status = res.status;
      console.log(status);
      if(status == 200) {
        this.toaster.Success('Miscellaneous updated successfully');
      }
      else {
        this.toaster.Error('Server Error');
      }
    },
    err => {
      this.toaster.Error('Something went wrong!');
    }
    );

  }

  ValidateTax(val:object){
    if (val['TaxCategory'] == null || val['TaxCategory'] == "") return true;
    if (val['Percentage'] == null || val['Percentage'] == 0) return true;
  }
  AddEditTaxCategory(val:object){
    // if (val['TaxCategory'] == null || val['TaxCategory'] == "") return true;
    // if (val['Percentage'] == null || val['Percentage'] == 0) return true;
    this.taxService.addEditTaxCategory(val).subscribe(resData => {
      console.log('taxcategory add edit', resData);
      if (resData.status == 200) {
        this.toaster.Success("Saved Successfully");
        this.getTaxCategories();
      } else {
        this.toaster.Error("Server Error");
      }
    }, error => {
      this.toaster.Error("Something went wrong");
    })

  }

  TaxCategoryId:any;
  IsActive:any;
  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.TaxCategoryId = id;
    this.IsActive = is_active;
    const taxStatus = {
      "TaxCategoryId": this.TaxCategoryId,
      "IsActive": this.IsActive,
      "CreatedBy": 1
    }
    this.taxService.taxCategoryStatus(taxStatus).subscribe(resData => {
      console.log('taxstatus data', resData);
      if (resData.status == 200) {
        this.toaster.Success("Status updated successfully");
        this.getTaxCategories();
      }
    })
    // const catstatus = {
    //   'CategoryId': this.CategoryId,
    //   'IsActive': this.IsActive,
    //   'CreatedBy': '1'
    //  };
    // this.categoryService.statusChange(catstatus).subscribe(data => {
    //   this.data = data.data[0];
    //   if (data.status == 200) {
    //     this.toaster.Success("Status Updated Successfully");
    //     this.getCategories(this.page);
    //   }
    // });
  }
}

import { Component, OnInit, Input } from '@angular/core';
import { MiscellaneousService } from '../../../services/miscellaneous/miscellaneous.service';
import { ToasterService } from '../../../services/toaster.service';
import { Router } from '@angular/router';
import { Miscellaneous } from '../../../models/miscellaneous';

@Component({
  selector: 'app-miscellaneous-list',
  templateUrl: './miscellaneous-list.component.html',
  styleUrls: ['./miscellaneous-list.component.scss']
})
export class MiscellaneousListComponent implements OnInit {
  data: any;
  page: number = 1;
  count: number;

  constructor(private miscService: MiscellaneousService, private toaster: ToasterService, private router: Router) { }
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
  }



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

  addMisc() {
    console.log('add misc');
  }





  onSubmit() {
    console.log('submit');
  }

}

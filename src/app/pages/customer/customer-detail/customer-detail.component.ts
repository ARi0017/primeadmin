import { Component, OnInit } from "@angular/core";
import { CustomerAccount, CustomerAddress, CustomerIncentive } from "src/app/model/customer.model";


import { CustomerService } from "src/app/services/customer.service";
import { ActivatedRoute, Router } from "@angular/router";
import { NzMessageService } from "ng-zorro-antd/message";
import { AuthService } from "src/app/services/auth.service";
import { CommonComponent } from "../../common/common.component";
import { TranslateService } from "@ngx-translate/core";


@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent extends CommonComponent implements OnInit {
  customerId: string = undefined;
  customerAddress: CustomerAddress[] = [];
  customerAccount: CustomerAccount = new CustomerAccount();
  incentives: CustomerIncentive[] = [];
  total: number = 0;
  loading: Boolean = false;

  constructor(
    private customerService: CustomerService,
    router: Router,
    auth: AuthService,
    private route: ActivatedRoute,
    private message: NzMessageService,
    private translate: TranslateService
  ) {
    super(auth, router);
    this.route.paramMap.subscribe((res) => {
      this.customerId = res.get("id");
    });
    this.translate.setDefaultLang(localStorage.getItem("lang"));
  }


  ngOnInit(): void {
    this.populateCustomerAddress();
    this.populateCustomerAccount();

  }

  populateCustomerAddress(): void {
    this.customerService.getCustomerAddressById(this.customerId)
      .subscribe((res) =>{
        this.customerAddress = res.data;
      });
  }

  populateCustomerAccount(): void {
    this.customerService.getCustomerAccountDetailById(this.customerId)
      .subscribe((res) =>{
        this.customerAccount = res.data;
      });
  }

  populateCustomerIncentives(): void {
    this.loading = true;
    this.customerService.getCustomerIncentivesById(this.customerId)
      .subscribe((res) =>{
        this.incentives = res.data;
        this.total = res.count;
        this.loading = false;
      });
  }
}

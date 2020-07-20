import { Component, OnInit,ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/Customer/customer.service';
import { Category } from '../../models/category';
import { Customeraddress } from '../../models/customeraddress';
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  Customeraddress: Customeraddress = new Customeraddress("", "", "", "", "", "", null, "","", "", "0","");
  @ViewChild("myModal", { static: true }) myModal: ModalDirective;
  @ViewChild("myModal1", { static: true }) myModal1: ModalDirective;
  data: any;
  url:any;
  customername: any='';
  page: number = 1;
  count: number;
  addressname:any;
  addressdata: object;
  id: string;
  CustomerId: any='';
  IsActive:any ='';
  cartdata: object;
  orderdata: object;
  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
  }

  ngOnInit() {
    let initialCustomer = {customername: this.customername, page: this.page}
    this.getCustomers(initialCustomer);
    this.getCount();
  }

  search(){
    const customer = {
      customername:this.customername,page : this.page
      }
          this.customerService.getCustomerList(customer).subscribe(data => {
            this.data = data.data;
            this.url = data.Imgurl;
          });
  }


  getPagination(page: number){
    this.page = page;
    this.getCustomers({customername: this.customername, page: this.page});
  }

  getCount() {
    this.customerService.getCount()
      .subscribe(res => {
        this.count = res.TotalCustomerCount;
      });
  }


  getCustomers(customerInterface: {customername: string, page: number}) {
    const customer =  customerInterface;
    this.customerService.getCustomerList(customer).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
    });
  }
  GetCustomerCart(id :string) {
    const customer = {
"CustomerId":id
}
    this.customerService.GetCustomerCart(customer).subscribe(data => {
      this.cartdata = data.data;
    });
  }
  GetCustomerOrder(id :string) {
    const customer = {
"CustomerId":id
}
    this.customerService.GetCustomerOrder(customer).subscribe(data => {
      this.orderdata = data.data;
    });
  }

  CustomerAddressList(id :string) {
    const customerid = {
"CustomerId":id
}
    this.customerService.CustomerAddressList(customerid).subscribe(data => {
      this.addressdata = data.data;
    });
  }
  onSubmitaddress(addressid : string) {
    if(addressid != ''){
      this.Customeraddress.AddressId = addressid;
      this.customerService.AddEditCustomerAddress(this.Customeraddress)
      .subscribe(res => {
        if (res.status == 200) {

            this.toaster.Success("Customer Address Added Successfully");

          this.router.navigate(['customer-list']);
        }
      }, err => {
        this.toaster.Error("Server Error");
      })
    }else{
      this.customerService.AddEditCustomerAddress(this.Customeraddress)
      .subscribe(res => {
        if (res.status == 200) {

            this.toaster.Success("Customer Address Updated Successfully");


          this.router.navigate(['customer-list']);
        }
      }, err => {
        this.toaster.Error("Server Error");
      })
    }

  }

  addCustomer() {
    this.router.navigate(['/customer-list/add']);
  }

  // Change Status
  onStatus(id: any, is_active: any) {
   
    if (!confirm('Are You Sure ?')) {
      return;
    }
    this.CustomerId = id;
    this.IsActive = is_active;
    const customertatus = {
      'CustomerId': this.CustomerId,
      'IsActive': this.IsActive,
      'CreatedBy': '1'
     };
    this.customerService.statusChange(customertatus).subscribe(data => {
      this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Product Status Updated Successfully");
        this.search();
      }
    });
  }




}

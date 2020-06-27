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
  addressname:any;
  addressdata: object;
  id: string;
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
    this.getCustomers();
  }

  search(name){
    const customer = {
      "Name":"",
      "Phone":"",
      "DefaultAdderess":"",
      "email":"",
      "DefaultPincode":"",
      "OwnRefCode":"",
      "RefByCustomerName":"",
      "RefByCustomerPhone":"",
      "Page":"1",
      "Size":"10"
      }
          this.customerService.getCustomerList(customer).subscribe(data => {
            this.data = data.data;
            this.url = data.Imgurl;
          });
  }
  getCustomers() {
    const customer = {
"Name":"",
"Phone":"",
"DefaultAdderess":"",
"email":"",
"DefaultPincode":"",
"OwnRefCode":"",
"RefByCustomerName":"",
"RefByCustomerPhone":"",
"Page":"1",
"Size":"10"
}
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

  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }
  // Change Status
  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }




}

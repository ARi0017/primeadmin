import { Component, OnInit,ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/Customer/customer.service';
import { Category } from '../../models/category';
import { Customeraddress } from '../../models/customeraddress';
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-customer-address',
  templateUrl: './customer-address.component.html'
})
export class CustomerAddressComponent implements OnInit {
  Customeraddress: Customeraddress = new Customeraddress("", "", "", "", "", "", null, "","", "", "0","");

  @ViewChild("myModal", { static: true }) myModal: ModalDirective;
  data: any;
  url:any;
  addressname:any;
  addressdata: object;
  id: string;
  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
  }

  ngOnInit() {
    this.CustomerAddressList(this.id);
  }


  CustomerAddressList(id :string) {
    const customerid = {
"CustomerId":id
}
    this.customerService.CustomerAddressList(customerid).subscribe(data => {
      this.addressdata = data.data;
    });
  }
  getAddressbyid(id :string) {
    this.customerService.GetAddressbyid(id).subscribe(data => {
      console.log(data);
     // this.Customeraddress = data.data;
    });
  }
  onSubmitaddress() {
    if(this.id != ''){
      this.Customeraddress.AddressId = this.id;
      this.customerService.AddEditCustomerAddress(this.Customeraddress)
      .subscribe(res => {
        if (res.status == 200) {

            this.toaster.Success("Customer Address Updated Successfully");

          this.router.navigate(['customer-address']);
        }
      }, err => {
        this.toaster.Error("Server Error");
      })
    }else{
      this.customerService.AddEditCustomerAddress(this.Customeraddress)
      .subscribe(res => {
        if (res.status == 200) {

            this.toaster.Success("Customer Address Added Successfully");


          this.router.navigate(['customer-address']);
        }
      }, err => {
        this.toaster.Error("Server Error");
      })
    }

  }



  onDelete(id: any) {
    const customer = {
      "AdderssId":id,
      "CreatedBy":1
      }
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.customerService.DeleteCustomerAddress(id).subscribe(res => {
      if (res.status == 200) {

          this.toaster.Success("Customer Address Deteled Successfully");

        this.router.navigate(['customer-address']);
      }
    }, err => {
      this.toaster.Error("Server Error");
    });
  }
  // Change Status
  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }




}

import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/Customer/customer.service';
import { Customer } from '../../models/customer';
import { ToasterService } from '../../services/toaster.service';
import { Customeraddress } from '../../models/customeraddress';
import { ModalDirective } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {
  Customeraddress: Customeraddress = new Customeraddress("", "", "", "", "", null, "");
  Customer: Customer = new Customer("", "", "", "", "", "", null, 1, "", "", "0");
  @ViewChild("myModal", { static: true }) myModal: ModalDirective;
  
  parentcategory: any;
  id: any;
  response: any;
  dlFile: any;
  filename: string;
  uploadData: FormData;

  // data: any;
  addressdata: object = null;
  cartdata: object = null;
  orderdata: object = null;
  produrl: string = null;
  walletdata:object = null;
  bankData:object = null;
  PayAmount:number = null;
  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
    this.route.paramMap.subscribe(res => {
      this.id = res.get("id");
    });
  }

  ngOnInit() {
    if (this.id) {
      this.CustomerWholeData(this.id);
    }
  }
  CustomerWholeData(id :string) {
    const customerid = {"CustomerId":id}
    this.customerService.getWholeCustomerData(customerid).subscribe(data => {
      if (data) {
          this.Customer = data.customerinfo[0];
          this.addressdata = Object.keys(data.addressinfo).length > 0 ? data.addressinfo : null;
          this.cartdata = Object.keys(data.cartinfo).length > 0 ? data.cartinfo : null;
          this.produrl = data.productimg;
          this.orderdata = Object.keys(data.ordeinfo).length > 0 ? data.ordeinfo : null;
          this.walletdata = Object.keys(data.walletinfo).length > 0 ? data.walletinfo : null;
          this.bankData = Object.keys(data.accountinfo[0]).length > 0 ? data.accountinfo[0] : null;
        }
        else {
          this.toaster.Error("Couldn't fetch detail, server error");
        }
    });
  }
  getFileInfo(event: any) {
    this.dlFile = event.target.files;
    for (let file of this.dlFile) {
      this.uploadData = new FormData();
      if (file != undefined) {
        this.uploadData.append("myFile", file, file.name);
      }
      this.Customer.ProfileImage = file.name;
    }
  }

  onSubmit() {
    this.Customer.CreatedBy = 1;
    // this.Customer
    this.customerService.AddNewCustomer(this.Customer)
      .subscribe(res => {
        if (res.status == 200) {
          if (this.uploadData != null) {
            this.customerService.fileupload(this.uploadData)
              .subscribe(res => console.log("File Uploaded Successfully!"), err => console.log("File not uploaded", err));
          }
          if (this.id!= null)
            this.toaster.Success("Customer Info Updated Successfully");
          else
            this.toaster.Success("Customer Info Added Successfully");
        }
        else
          this.toaster.Success("Duplicate Customer found");
      }, err => {
        this.toaster.Error("Server Error");
      })
  }
  
  backpage() {
    this.router.navigate(['/customer-list']);
  }
  getAddressbyid(id :string, AddressName:string, Name:string, Phone:string, Address:string, Email:string, Landmark:string) {
    this.Customeraddress.AddressId = id;
    this.Customeraddress.AddressName = AddressName;
    this.Customeraddress.Name = Name;
    this.Customeraddress.Phone = Phone;
    this.Customeraddress.Address = Address;
    this.Customeraddress.Email = Email;
    this.Customeraddress.Landmark = Landmark;
  }

  CustomerAddressList(id :string) {
    const customerid = {"CustomerId":id}
    this.customerService.CustomerAddressList(customerid).subscribe(data => {
      this.addressdata = Object.keys(data.data).length > 0 ? data.data : null;
    });
  }
  onSubmitaddress() {
      this.customerService.AddEditCustomerAddress(this.Customeraddress)
      .subscribe(res => {
        if (res.status == 200) {
            this.toaster.Success("Customer Address Updated Successfully");
            this.CustomerAddressList(this.id);
        }
      }, err => {
        this.toaster.Error("Server Error");
      });
  }



  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    const customer = {"AdderssId":id, "CreatedBy":1}
    this.customerService.DeleteCustomerAddress(customer).subscribe(res => {
      if (res.status == 200) {
          this.toaster.Success("Customer Address Deteled Successfully");
          this.CustomerAddressList(this.id);
      }
    }, err => {
      this.toaster.Error("Server Error");
    });
  }
  GetCustomerWallet(id :string) {
    const customer = {"CustomerId":id}
    this.customerService.GetCustomerWallet(customer).subscribe(data => {
      this.walletdata = data.data;
    });
  }
  UpdateWalletPayment() {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    const customer = {"CustomerId":this.id, "Amount": -Math.abs(this.PayAmount)}
    console.log("Pay Post Data", customer);
    this.customerService.CustomerWalletPayment(customer).subscribe(res => {
      if (res.status == 200) {
          this.toaster.Success("Customer payment Successfull");
          this.GetCustomerWallet(this.id);
          this.Customer.TotalWalletAmt -= this.PayAmount;
          this.PayAmount = null;
      }
    }, err => {
      this.toaster.Error("Server Error");
    });
  }

}

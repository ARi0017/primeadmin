import { Component, OnInit,ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/Customer/customer.service';
import { Customeraddress } from '../../models/customeraddress';
import { ModalDirective } from "ngx-bootstrap/modal";
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  // Customeraddress: Customeraddress = new Customeraddress("", "", "", "", "", "", null, "","", "", "0","");
  @ViewChild("myModal", { static: true }) myModal: ModalDirective;
  @ViewChild("myModal1", { static: true }) myModal1: ModalDirective;
  @ViewChild("myModal2", { static: true }) myModal2: ModalDirective;
  @ViewChild("myModal3", { static: true }) myModal3: ModalDirective;
  data: any;
  url:any;
  customername: any='';
  customerphone: any='';
  page: number = 1;
  count: number;
  addressname:any;
  addressdata: object;
  id: string;
  CustomerId: any='';
  IsActive:any ='';
  cartdata: object;
  orderdata: object;
  walletdata:object;
  produrl: string;
  cusName:string;
  PageSize:number=10;
  constructor(private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
  }

  ngOnInit() {
    this.getCustomers(this.page);
  }


  getPagination(page: number){
    this.page = page;
    this.getCustomers(this.page);
  }


  getCustomers(page: number) {
    let initialCustomer = {customername: this.customername, customerphone: this.customerphone, page: page, Size: this.PageSize}
    this.customerService.getCustomerList(initialCustomer).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
      this.count = (Object.keys(this.data).length > 0) ? this.data[0].RowCount : 0;
    });
  }
  GetCustomerCart(id :string, name:string) {
    this.cusName = name;
    const customer = {"CustomerId":id}
    this.customerService.GetCustomerCart(customer).subscribe(data => {
      this.cartdata = data.data;
      this.produrl = data.productimg;
    });
  }
  GetCustomerOrder(id :string, name:string) {
    this.cusName = name;
    const customer = {"CustomerId":id}
    this.customerService.GetCustomerOrder(customer).subscribe(data => {
      this.orderdata = data.data;
    });
  }
  GetCustomerWallet(id :string, name:string) {
    this.cusName = name;
    const customer = {"CustomerId":id}
    this.customerService.GetCustomerWallet(customer).subscribe(data => {
      this.walletdata = data.data;
    });
  }

  CustomerAddressList(id :string, name:string) {
    this.cusName = name;
    this.CustomerId = id;
    const customerid = {"CustomerId":id}
    this.customerService.CustomerAddressList(customerid).subscribe(data => {
      this.addressdata = data.data;
    });
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
        this.toaster.Success("Status Updated Successfully");
        this.getCustomers(this.page);
      }
    });
  }


  onDelete(id: any) {
    const customer = {"AdderssId":id, "CreatedBy":1}
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.customerService.DeleteCustomerAddress(customer).subscribe(res => {
      if (res.status == 200) {
          const customerid = {"CustomerId":this.CustomerId}
          this.customerService.CustomerAddressList(customerid).subscribe(data => {
            this.addressdata = data.data;
          });
          this.toaster.Success("Customer Address Deteled Successfully");
      }
    }, err => {
      this.toaster.Error("Server Error");
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CustomerService } from '../../services/Customer/customer.service';
import { Category } from '../../models/category';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html'
})
export class CustomerListComponent implements OnInit {
  data: any;
  constructor(private customerService: CustomerService,
    private router: Router) {
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
    });
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

import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomerService } from '../../services/Customer/customer.service';
import { Customer } from '../../models/customer';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
})
export class CustomerComponent implements OnInit {

  Customer: Customer = new Customer("", "", "", "", "", "", null, localStorage.getItem('id'), "", "", "0");
  parentcategory: any;
  id: any;
  response: any;
  dlFile: any;
  filename: string;
  uploadData: FormData;

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
      this.getCustomer();
    }
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
    this.customerService.AddNewCustomer(this.Customer)
      .subscribe(res => {
        if (res.status == 200) {
          if (this.id) {
            this.toaster.Success("Customer Updated Successfully");
          } else {
            this.toaster.Success("Customer Added Successfully");
          }
          if (this.uploadData) {
            this.customerService.fileupload(this.uploadData)
              .subscribe(res => console.log("File Uploaded Successfully!"), err => console.log("File not uploaded", err));
          }
          this.router.navigate(['customer-list']);
        }
      }, err => {
        this.toaster.Error("Server Error");
      })
  }

  getCustomer() {
    this.customerService.getCustomer({ CustomerId: this.id }).subscribe(data => {
      if (data) {
        this.Customer = data.data[0];
      }
      else {
        this.toaster.Error("Couldn't fetch detail, server error");
      }
    });
  }



}

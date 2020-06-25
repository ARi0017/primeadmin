import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { RetailerService } from '../../services/Retailer/retailer.service';

@Component({
  selector: 'app-retailer-list',
  templateUrl: './retailer-list.component.html',
  styleUrls: ['./retailer.component.scss']
})
export class RetailerListComponent implements OnInit {
  data: any;
  url: string;
  constructor(private retailerService: RetailerService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getRetailer();
  }

  search(name: string) {
    const retailer1 = {
      "Name": name,
      "Phone":"",
      "Address":"",
      "Pincode":"",
      "Landmark":"",
      "ContactPerson":"",
      "Page":"1",
      "Size":"10"
    }
    this.retailerService.getRetailer(retailer1).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
//console.log(data);
    });
  }

  getRetailer() {
      const retailer = {
      "Name": "",
      "Phone":"",
      "Address":"",
      "Pincode":"",
      "Landmark":"",
      "ContactPerson":"",
      "Page":"1",
      "Size":"10"
    }
    this.retailerService.getRetailer(retailer).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
    });
  }

  addRetailer() {
    this.router.navigate(['/retailer-list/add']);
  }

  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.retailerService.deleteRetailer(id).subscribe(data => {
      this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Retailer Deleted Successfully");
      }
    });
  }
  // Change Status
  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }

  }




}

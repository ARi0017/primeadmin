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
  retailername: any='';
  PageSize:number=10;
  count: number; page: number = 1;
  constructor(private retailerService: RetailerService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.search(this.page);
  }

  search(page: number) {
    let retailer1 = {Name: this.retailername, Phone:"", Address:"", Pincode:"", Landmark:"", ContactPerson:"", Page:page, Size: this.PageSize}
    this.retailerService.getRetailer(retailer1).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
      //this.dataCount = (this.data.length > 0) ? this.data[0].RowCount : 0;
      this.count = (Object.keys(this.data).length > 0) ? this.data[0].RowCount : 0;
      // this.count = (this.dataCount - (this.dataCount%this.PageSize))/this.PageSize + 1;
      console.log("Total Page Count",this.count);
    });
  }
  getPagination(page: number){
    this.page = page;
    this.search(this.page);
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

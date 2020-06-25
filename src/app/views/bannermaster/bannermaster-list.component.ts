import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { BannermasterService } from '../../services/Bannermaster/bannermaster.service';
import { Category } from '../../models/category';
import { ToasterService } from '../../services/toaster.service';
@Component({
  selector: 'app-bannermaster-list',
  templateUrl: './bannermaster-list.component.html',
  styleUrls: ['./bannermaster.component.scss']
})
export class BannermasterListComponent implements OnInit {
  data: any;
  url: any;
  constructor(private bannermasterService: BannermasterService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getBanners();
  }



  getBanners() {
    const banner = {
      'name': '',
      'page': '1',
      'size': '10'
     };
    this.bannermasterService.getBanners(banner).subscribe(data => {
      this.data = data.data[0];
      this.url = data.Imgurl;
console.log(data.Imgurl);
    });
  }

  addBanner() {
    this.router.navigate(['/bannermaster-list/add']);
  }

  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.bannermasterService.deleteBanner(id).subscribe(data => {
    //  this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Banner Deleted Successfully");
              this.router.navigate(["/bannermaster-list"]);
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

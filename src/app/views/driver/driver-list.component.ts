import { Component, OnInit,ViewChild } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { DriverService } from '../../services/Driver/driver.service';
import { ModalDirective } from "ngx-bootstrap/modal";

@Component({
  selector: 'app-driver-list',
  templateUrl: './driver-list.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverListComponent implements OnInit {
@ViewChild("myModal", { static: true }) myModal: ModalDirective;
@ViewChild("myModal1", { static: true }) myModal1: ModalDirective;

  data: any;
  url: string;
  constructor(private driverService: DriverService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getDriver();
  }

  search(name: string) { 
    const driver1 = {
      "Name":name,
      "Phone":"",
      "Email":"",
      "Address":"",
      "Pincode":"",
      "Page":1,
      "Size":10
};
    this.driverService.getDriver(driver1).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
//console.log(data);
    });
  }
  GetPendingorder(DriverId: string){}
  GetCompleteorder(DriverId: string){}
  getDriver() {
    const driver = {
      "Name":"",
      "Phone":"",
      "Email":"",
      "Address":"",
      "Pincode":"",
      "Page":1,
      "Size":10
};
    this.driverService.getDriver(driver).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
//console.log(this.data);
    });
  }

  addDriver() {
    this.router.navigate(['/driver-list/add']);
  }

  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.driverService.deleteDriver(id).subscribe(data => {
      this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Driver Deleted Successfully");
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

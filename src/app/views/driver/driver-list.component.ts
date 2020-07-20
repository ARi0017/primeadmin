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
  drivername: any='';
  url: string;
  page: number = 1;
  count: number;
  DriverId: any='';
  IsActive:any ='';
  constructor(private driverService: DriverService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    let initialDriver = {drivername: this.drivername, page: this.page}
    this.getDriver(initialDriver);
    this.getCount();
  }

  search() { 
    const driver1 = {
      drivername:this.drivername,page : this.page
};
    this.driverService.getDriver(driver1).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
//console.log(data);
    });
  }
  GetPendingorder(DriverId: string){}
  GetCompleteorder(DriverId: string){}
  getDriver(driverInterface: {drivername: string, page: number}) {
    const driver =  driverInterface;
    this.driverService.getDriver(driver).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
//console.log(this.data);
    });
  }


  getPagination(page: number){
    this.page = page;
    this.getDriver({drivername: this.drivername, page: this.page});
  }

  getCount() {
    this.driverService.getCount()
      .subscribe(res => {
        this.count = res.TotalDriverCount;
      });
  }

  addDriver() {
    this.router.navigate(['/driver-list/add']);
  }

  onStatus(id: any, is_active: any) {
   
    if (!confirm('Are You Sure ?')) {
      return;
    }
    this.DriverId = id;
    this.IsActive = is_active;
    const drivertatus = {
      'DriverId': this.DriverId,
      'IsActive': this.IsActive,
      'CreatedBy': '1'
     };
    this.driverService.statusChange(drivertatus).subscribe(data => {
      this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Product Status Updated Successfully");
        this.search();
      }
    });
  }




}

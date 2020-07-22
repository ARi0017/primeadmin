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
    this.getDriver(this.page);
  }
  
  GetPendingorder(DriverId: string){}
  GetCompleteorder(DriverId: string){}
  getDriver(page: number) {
    let Driver = {drivername: this.drivername, page: page}
    this.driverService.getDriver(Driver).subscribe(data => {
      this.data = data.data;
      this.url = data.Imgurl;
      this.count = (this.data.length > 0) ? this.data[0].RowCount : 0;
      console.log("Total Row Count",this.count);
    });
  }


  getPagination(page: number){
    this.page = page;
    this.getDriver(this.page);
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
        this.getDriver(this.page);
      }
    });
  }




}

import { Component, OnInit } from '@angular/core';
import { PincodeService } from '../../../services/Pincode/pincode.service';
import { ToasterService } from '../../../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pincode-list',
  templateUrl: './pincode-list.component.html',
  styleUrls: ['./pincode-list.component.scss']
})
export class PincodeListComponent implements OnInit {
  pincode: any = '';
  Route: any = '';
  data: any;
  page: number = 1;
  PincodeId: any = '';
  count: number;
  isActive: any = '';
  PageSize:number=10;


  constructor(private pincodeService: PincodeService, private toaster: ToasterService, private router: Router) { }

  ngOnInit() {
    this.getPincode(this.page);
  }

  getPincode(page: number) {
    console.log('page:', page);
    let Pincode = {Pincode: this.pincode, Page: page, Area: '', District: '', Route: this.Route, Size: this.PageSize}

      this.pincodeService.getPincode(Pincode).subscribe(data => {
        this.data = data.data;
        console.log(this.data);
        this.count = (Object.keys(this.data).length > 0) ? this.data[0].RowCount : 0;
        console.log("Total Row Count",this.count);


    });
  }

  addPincode() {
    console.log('add pincode');
    this.router.navigate(['/pincode/add']);
  }

  getPagination(page: number){
    this.page = page;
    this.getPincode(this.page);
  }

  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    console.log(id);
    this.PincodeId = id;
    this.isActive = is_active;
    const pinStatus = {
      'PincodeId': this.PincodeId,
      'IsActive': this.isActive,
      'CreatedBy': '1'
     };
     console.log(pinStatus)
    this.pincodeService.pincodeStatusChange(pinStatus).subscribe(data => {
      console.log(data)
      this.data = data.data;


      if (data.status == 200) {
        this.toaster.Success("Status Updated Successfully");
        this.getPincode(this.page);
      }
    });
  }

}

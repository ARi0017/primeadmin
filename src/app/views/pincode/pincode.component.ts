import { Component, OnInit } from '@angular/core';
import { PincodeService } from '../../services/Pincode/pincode.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { Pincode } from '../../models/pincode';

@Component({
  selector: 'app-pincode',
  templateUrl: './pincode.component.html',
  styleUrls: ['./pincode.component.scss']
})
export class PincodeComponent implements OnInit {
  Pincode = new Pincode('', '','', '', '', '');
  id: any;
  response: any;
  dlFile: any;
  filename: any[];
  PincodeId: any = '';

  constructor(private pincodeService: PincodeService, private route: Router, private toaster: ToasterService, private router: ActivatedRoute ) {
    this.router.paramMap.subscribe(res => {
      this.id = res.get("id");
    });
  }

  ngOnInit() {
    if(this.id){
      this.getPincode();
    }
  }

  getPincode(){
    this.pincodeService.getPincodeById({"PincodeId": this.id}).subscribe(data => {
      console.log('data',data)
      this.Pincode = data.data[0];

    });
  }

  onSubmit() {
    console.log('submitted')
    !this.id ? this.addPincode() : this.editPincode();
  }

  addPincode() {
    this.Pincode.CreatedBy = 1;
    this.pincodeService.addedItPincode(this.Pincode).subscribe(res => {
      console.log(res.status);
      let status = res.status;
      if (status == 200) {
        this.toaster.Success('Pincode added successfully');
        this.route.navigate(['/pincode']);
      }
      else {
        this.toaster.Error('Server Error!');
      }
    },
    err => {
      this.toaster.Error("Something went wrong");
    }
    )

  }



  editPincode() {
    this.PincodeId = this.id;
    this.Pincode.CreatedBy = 1;
    this.Pincode.PincodeId= this.PincodeId;
    console.log(this.Pincode);
    this.pincodeService.addedItPincode(this.Pincode).subscribe(res => {
      console.log(res.status);
      let status = res.status;
      if(status == 200) {
        this.toaster.Success('Pincode updated successfully')
        this.route.navigate(['/pincode']);
      }
      else {
        this.toaster.Error('Server Error')
      }
    },
    err => {
      this.toaster.Error('Something went wrong!');
    }
    )
  }

  backPage() {
    this.route.navigate(['/pincode'])
  }

}

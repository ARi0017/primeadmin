import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { RetailerService } from '../../services/Retailer/retailer.service';
import { ToasterService } from '../../services/toaster.service';
import { NgForm } from '@angular/forms';
import { Retailer } from '../../models/retailer';

@Component({
  selector: 'app-retailer',
  templateUrl: './retailer.component.html',
})
export class RetailerComponent implements OnInit {
//@ViewChild('categoryForm',{ read: true, static: false }) public createcategoryform: NgForm;
Retailer = new Retailer(null,null,null,null,null,"",null,null,null,null,null,"",null,null,"",null,null,null);
  id: any;
  response: any;
  dlFile: any;
  filename: any[];
  retailerpicture: string;

  constructor(private retailerService: RetailerService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
    }

  ngOnInit() {
    if(this.id){
      this.getRetailer();
    }
  }
  onSubmit() {
    !this.id ? this.addReatailer() : this.editRetailer();
  }
  uploadFile(event: any) {
    this.dlFile = event.target.files;
    console.log(this.dlFile);

  }

addReatailer(){
  this.filename = [];
    var i = 0;
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Retailer.RetailerImage = file.name;
        this.Retailer.RetailerId = 0;
        this.Retailer.CreatedBy = 1;
        this.retailerService.addeditRetailer(this.Retailer).subscribe(
          res => {
            console.log(res.status);
            var status = res.status;
            if (status == 200) {
              this.retailerService.fileupload(uploadData).subscribe(
                res => {
                  var status = res.status;
                  if (status == 200) {
                    console.log('file uploaded');
                  }
                },
                err => {
                  this.toaster.Error('Something Went Wrong');
                }
              );
              this.toaster.Success("Retailer Added Successfully");
              this.router.navigate(["/retailer-list"]);
            } else {
              this.toaster.Error("Server Error!");
            }
          },
          err => {
            this.toaster.Error("Something Went Wrong");
          }
        );

      }

      this.filename[i] = file.name;
      i++;
    }
}

getRetailer() {
  const retailerid = {
        'RetailerId': this.id
      };
  this.retailerService.getRetailerbyid(retailerid).subscribe(data => {
    this.Retailer = data.data[0];
    this.retailerpicture = data.data[0].RetailerImage;
  });
}

editRetailer(){
  this.filename = [];
    var i = 0;
    if(this.dlFile!= undefined){
      for (let file of this.dlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.Retailer.RetailerImage = file.name;
          this.Retailer.RetailerId = this.id;
          this.Retailer.CreatedBy = 1;
          this.retailerService.addeditRetailer(this.Retailer).subscribe(
            res => {
              console.log(res.status);
              var status = res.status;
              if (status == 200) {
                this.retailerService.fileupload(uploadData).subscribe(
                  res => {
                    var status = res.status;
                    if (status == 200) {
                      console.log('file uploaded');
                    }
                  },
                  err => {
                    this.toaster.Error('Something Went Wrong');
                  }
                );
                this.toaster.Success("Retailer Updated Successfully");
                this.router.navigate(["/retailer-list"]);
              } else {
                this.toaster.Error("Server Error!");
              }
            },
            err => {
              this.toaster.Error("Something Went Wrong");
            }
          );

        }

        this.filename[i] = file.name;
        i++;
      }
    }
    else{
      this.Retailer.RetailerImage = this.retailerpicture;
      this.Retailer.RetailerId = this.id;
      this.Retailer.CreatedBy = 1;
      this.retailerService.addeditRetailer(this.Retailer).subscribe(
        res => {
          console.log(res.status);
          var status = res.status;
          if (status == 200) {
            this.toaster.Success("Retailer Updated Successfully");
            this.router.navigate(["/retailer-list"]);
          } else {
            this.toaster.Error("Server Error!");
          }
        },
        err => {
          this.toaster.Error("Something Went Wrong");
        }
      );
    }

}


}

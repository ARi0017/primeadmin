import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { DriverService } from '../../services/Driver/driver.service';
import { Driver } from '../../models/driver';
import { ToasterService } from '../../services/toaster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
})
export class DriverComponent implements OnInit {
//@ViewChild('categoryForm',{ read: true, static: false }) public createcategoryform: NgForm;
  Driver = new Driver(null,null,null,null,null,"",null,null,null);
  parentcategory: any;
  id: any;
  response: any;
  dlFile: any;
  filename: any[];
  driverpicture: any;

  constructor(private driverService: DriverService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
    }

  ngOnInit() {
    if(this.id){
      this.getDriver();
    }
  }
  onSubmit() {
    !this.id ? this.addDriver() : this.editDriver();
  }
  uploadFile(event: any) {
    this.dlFile = event.target.files;
    console.log(this.dlFile);

  }

addDriver(){
  this.filename = [];
    var i = 0;
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Driver.ProfileImage = file.name;
        this.Driver.DriverId = 0;
        this.Driver.CreatedBy = 1;
        this.driverService.addeditDriver(this.Driver).subscribe(
          res => {
            console.log(res.status);
            var status = res.status;
            if (status == 200) {
              this.driverService.fileupload(uploadData).subscribe(
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
              this.toaster.Success("Driver Added Successfully");
              this.router.navigate(["/driver-list"]);
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

getDriver(){
  this.driverService.getDriverbyid(this.id).subscribe(data => {
    this.Driver = data.data[0];
    this.driverpicture = data.data[0].ProfileImage;
  });
}

editDriver(){
  this.filename = [];
    var i = 0;
    if(this.dlFile!= undefined){
      for (let file of this.dlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.Driver.ProfileImage = file.name;
          this.Driver.DriverId = this.id;
          this.Driver.CreatedBy = 1;
          this.driverService.addeditDriver(this.Driver).subscribe(
            res => {
              console.log(res.status);
              var status = res.status;
              if (status == 200) {
                this.driverService.fileupload(uploadData).subscribe(
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
                this.toaster.Success("Category Updated Successfully");
                this.router.navigate(["/categories-list"]);
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
      this.Driver.ProfileImage = this.driverpicture;
      this.Driver.DriverId = this.id;
      this.Driver.CreatedBy = 1;
      this.driverService.addeditDriver(this.Driver).subscribe(
        res => {
          console.log(res.status);
          var status = res.status;
          if (status == 200) {
            this.toaster.Success("Category Updated Successfully");
            this.router.navigate(["/categories-list"]);
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

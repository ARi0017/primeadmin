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
  Driver = new Driver(null,null,null,null,null,"",null,null,null,null, null);
  parentcategory: any;
  id: any;
  response: any;
  dlFile: any;
  lFile: any;
  filename: any[];
  driverpicture: any;
  drivingLicenceImage: any;


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
  messageDl: string; imgURL: any; url:any;
  uploadFile(event: any) {
    if (event.target.files.length === 0) return;
    this.dlFile = event.target.files;
    console.log(this.dlFile);
    var mimeType = this.dlFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageDl = "Only images are supported.";
      return;
    }
    this.messageDl = "";
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
      this.url = "";
    }
  }

  drivingLicenceMessage: string;
  drivingLicenseUrl: any;

  uploadDrivingLicenseFile(event: any) {
    console.log(event);
    if (event.target.files.length === 0) return;
    this.lFile = event.target.files;
    var mimeType = this.lFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.drivingLicenceMessage = "Only images are supported.";
      return;
    }
    this.drivingLicenceMessage = "";
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.drivingLicenceImage = reader.result;
      this.url = "";
    }
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
    console.log(data)
    this.Driver = data.data[0];
    this.driverpicture = data.data[0].ProfileImage;
    this.imgURL = data.data[0].ProfileImage;
    this.drivingLicenceImage = data.data[0].DrivingLicenseImage;
  });
}
backpage() {
  this.router.navigate(['/driver-list']);
}

editDriver() {
  this.filename = [];
  let i = 0;
  if (this.dlFile != undefined) {
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Driver.ProfileImage = file.name;
        this.driverService.fileupload(uploadData).subscribe(res => {
          if (res.status == 200) {
            console.log('driver image file name: ' ,this.Driver.ProfileImage);
          }
      }, err => {
        this.toaster.Error('Something Went Wrong');
        this.Driver.ProfileImage = "";
        return;
      })
      }
      this.filename[i] = file.name;
      i++;
    }
  } else {
    if (!confirm("No Driver Image is selected. Proceed ?")) {
      return;
    }
    this.Driver.ProfileImage = "";
  }
  if (this.lFile != null) {
    for (let file of this.lFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Driver.DrivingLicenseImage = file.name;
        console.log(this.Driver.DrivingLicenseImage);
        this.driverService.driverLicenceFileUpload(uploadData).subscribe(res => {
          if (res.status == 200) {
            console.log('driver license image file name: ' ,this.drivingLicenceImage);
          }
      }, err => {
        this.toaster.Error('Something Went Wrong');
        this.Driver.DrivingLicenseImage = "";
        return;
      })
      }
      this.filename[i] = file.name;
      i++;
    }
  } else {

    this.Driver.DrivingLicenseImage = "";
  }

  this.Driver.DriverId = this.id;
  this.Driver.CreatedBy = 1
  this.driverService.addeditDriver(this.Driver).subscribe(res => {
    console.log(res);
    if (res.status == 200) {
      this.toaster.Success("Driver Updated Successfully");
      this.router.navigate(["/driver-list"]);
    } else {
      this.toaster.Error("Server Error!");
    }
  },err => {
    this.toaster.Error("Something Went Wrong");
  })
}

// editDriver(){
//   this.filename = [];
//     var i = 0;
//     if(this.dlFile!= undefined){
//       for (let file of this.dlFile) {
//         const uploadData = new FormData();
//         if (file != undefined) {
//           uploadData.append("myFile", file, file.name);
//           this.Driver.ProfileImage = file.name;
//           this.Driver.DriverId = this.id;
//           this.Driver.CreatedBy = 1;
//           this.driverService.addeditDriver(this.Driver).subscribe(
//             res => {
//               console.log(res.status);
//               var status = res.status;
//               if (status == 200) {
//                 this.driverService.fileupload(uploadData).subscribe(
//                   res => {
//                     var status = res.status;
//                     if (status == 200) {
//                       console.log('file uploaded');
//                     }
//                   },
//                   err => {
//                     this.toaster.Error('Something Went Wrong');
//                   }
//                 );
//                 this.toaster.Success("Driver Updated Successfully");
//                 this.router.navigate(["/driver-list"]);
//               }
//             },
//             err => {
//               this.toaster.Error("Something Went Wrong");
//             }
//           );

//         }

//         this.filename[i] = file.name;
//         i++;
//       }
//     }

//     else{

//         if (!confirm("No picture is selected. Proceed ?")) {
//           return;
//         }
//         this.Driver.ProfileImage = "";
//         this.driverpicture = "";

//       this.Driver.DriverId = this.id;
//       this.Driver.CreatedBy = 1;
//       this.driverService.addeditDriver(this.Driver).subscribe(
//         res => {
//           console.log(this.Driver)
//           console.log(res.status);
//           var status = res.status;
//           if (status == 200) {
//             this.toaster.Success("Driver Updated Successfully");
//             this.router.navigate(["/driver-list"]);
//           } else {
//             this.toaster.Error("Server Error!");
//           }
//         },
//         err => {
//           this.toaster.Error("Something Went Wrong");
//         }
//       );
//     }

// }


}

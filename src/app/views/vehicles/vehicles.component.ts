import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../../services/Vehicle/vehicle.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';
import { Vehicle } from '../../models/vehicle';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicleid: any;
  vehicle = new Vehicle (null, '', '', '', 'Petrol', 0, '', '', 1);
  messageDl: string;
  fileName: any[];
  imgUrl: any;

  dlFile: any;
  vehiclePicture: any;
  isActive: any;
  uploadData: FormData;
  url:any = "https://service.onlyalibaba.in/vehicle/img/";
  constructor(private vehicleService: VehicleService, private router: Router, private route: ActivatedRoute, private toaster: ToasterService) {
    this.route.paramMap.subscribe(res => {
      this.vehicleid = res.get("id");
    })
   }

  ngOnInit() {
    if (this.vehicleid) {
      this.getVehicleById();
    }
  }

  getVehicleById() {
    this.vehicleService.vehicleSearchById({"VehicleId": this.vehicleid}).subscribe(data => {
      console.log(data);
      this.vehicle.VehicleId = data.data[0].VehicleId;
      this.vehicle.VehicleClass = data.data[0].VehicleClass;
      this.vehicle.VehicleBrand = data.data[0].VehicleBrand;
      this.vehicle.VehiclaImage = data.data[0].VehiclaImage;
      this.imgUrl = data.data[0].VehiclaImage;
      this.vehicle.RegistrationNo = data.data[0].RegistrationNo;
      this.isActive = data.data[0].IsActive;
      this.vehicle.FuelType = data.data[0].FuelType;
      this.vehicle.EngineCC = data.data[0].EngineCC;
      this.vehicle.Description = data.data[0].Description;
    })
  }

  onSubmit() {
    console.log('submit');
    !this.vehicleid ? this.addVehicle() : this.updateVehicle();
  }

  uploadFile(event: any) {
    if (event.target.files.length === 0) return;

    this.dlFile = event.target.files;

    var mimeType = this.dlFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageDl = "Only images are supported.";
      return;
    }
    this.messageDl = "";
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.imgUrl = reader.result;

      this.url = "";
    }

    for (let file of this.dlFile) {
      this.uploadData = new FormData();
      if (file != undefined) {
        this.uploadData.append("myFile", file, file.name);
      }
      this.vehicle.VehiclaImage = file.name;
    }
  }

  addVehicle() {
    this.fileName = [];
    let i = 0;
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.vehicle.VehiclaImage = file.name;
        this.vehicle.VehicleId = 0;
        this.vehicle.CreatedBy = 1;
        this.vehicleService.addEditVehicle(this.vehicle).subscribe(data => {
          console.log(data);
          if (data.status == 200) {
            this.vehicleService.vehicleImageUpload(uploadData).subscribe(resData => {
              if (resData.status == 200) {
                console.log('file uploaded');
              }
            },
            err => {
              this.toaster.Error('Something Went Wrong');
            }
            );
            this.toaster.Success("Vehicle Added Successfully");
            this.router.navigate(['/vehicles-list']);
          } else {
            this.toaster.Error("Server Error");
          }
        },
        err => {
          this.toaster.Error("Something Went Wrong");
        }
        );
      }
      this.fileName[i] = file.name;
      i++;
    }
  }

  updateVehicle() {
    this.fileName = [];
    var i = 0;
    if(this.dlFile!= undefined){
      for (let file of this.dlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.vehicle.VehiclaImage = file.name;
          this.vehicle.VehicleId = this.vehicleid;
          this.vehicle.CreatedBy = 1;
          this.vehicleService.addEditVehicle(this.vehicle).subscribe(
            res => {
              console.log(res.status);
              var status = res.status;
              if (status == 200) {
                this.vehicleService.vehicleImageUpload(uploadData).subscribe(
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
                this.toaster.Success("Vehicle Updated Successfully");
                this.router.navigate(["/vehicles-list"]);
              } else {
                this.toaster.Error("Server Error!");
              }
            },
            err => {
              this.toaster.Error("Something Went Wrong");
            }
          );

        }

        this.fileName[i] = file.name;
        i++;
      }
    }
    else{
      this.vehicle.VehiclaImage = this.vehiclePicture;
      this.vehicle.VehicleId = this.vehicleid;
      this.vehicle.CreatedBy = 1;
      this.vehicleService.addEditVehicle(this.vehicle).subscribe(
        res => {
          console.log(res.status);
          var status = res.status;
          if (status == 200) {
            this.toaster.Success("Vehicle Updated Successfully");
            this.router.navigate(["/vehicles-list"]);
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

  backpage() {
    this.router.navigate(['/vehicles-list']);
  }

}

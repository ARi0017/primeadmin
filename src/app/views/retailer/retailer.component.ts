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
  // RetailerId:number, Name:string, Phone:number, Address:string, Email:string, Location:string, Latitude:string, Longitude:string, Landmark:string, Pincode:number,
  // RetailerImage:string, ContactPerson:string, ContactPersonPhone:number, ContactPersonAddress:string, ContactPersonEmail:string, ContactPersonImage:string, CreatedBy:number
  Retailer = new Retailer(0,"","","","",null,null,null,"","",null,"","","","",null,null,null);
  id: any;
  response: any;
  vFile: any;
  cpFile: any;
  filename: any[];
  retailerpicture: string;
  contactPersonPicture: string;

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

  getRetailer() {
    const retailerid = {
          'RetailerId': this.id
        };
    this.retailerService.getRetailerbyid(retailerid).subscribe(data => {
      this.Retailer = data.data[0];
      this.retailerpicture = data.data[0].RetailerImage;
      this.VimgURL = data.data[0].RetailerImage;
      this.contactPersonPicture = data.data[0].ContactPersonImage;
      this.CPimgURL = data.data[0].ContactPersonImage;
    });
  }
  messageV: string; VimgURL: any;
  uploadVendorFile(event: any) {
    if (event.target.files.length === 0) return;

    this.vFile = event.target.files;
    console.log(this.vFile);

    var mimeType = this.vFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageV = "Only images are supported.";
      return;
    }
    this.messageV = "";
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.VimgURL = reader.result;
      this.url = "";
    }
  }

  messageCP: string; CPimgURL: any;
  uploadCPFile(event: any) {
    if (event.target.files.length === 0) return;

    this.cpFile = event.target.files;
    console.log(this.cpFile);

    var mimeType = this.cpFile[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.messageCP = "Only images are supported.";
      return;
    }
    this.messageCP = "";
    var reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (_event) => {
      this.CPimgURL = reader.result;
      this.url = "";
    }
  }
  url:any;
  onSubmit() {
    this.filename = [];
    var i = 0;
    if(this.vFile!= undefined){
      for (let file of this.vFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.Retailer.RetailerImage = file.name;
          this.retailerService.fileupload(uploadData).subscribe(
            res => {
              var status = res.status;
              if (status == 200) {
                console.log('Retailer Image uploaded. File name: ', this.Retailer.RetailerImage);
              }
            },
            err => {
              this.toaster.Error('Something Went Wrong');
              this.Retailer.RetailerImage = "";
              return;
            }
          );
        }

        this.filename[i] = file.name;
        i++;
      }
    } else {
      if (!confirm("No Vendor Image is selected. Proceed ?")) {
        return;
      }
      this.Retailer.RetailerImage = "";
    }
    if (this.cpFile!=null){
      for (let file of this.cpFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
        }
        this.Retailer.ContactPersonImage = file.name;
        this.retailerService.fileupload(uploadData).subscribe(
          res => {
            var status = res.status;
            if (status == 200) {
              console.log('Contact Person Image uploaded. File name: ', this.Retailer.ContactPersonImage);
            }
          },
          err => {
            this.toaster.Error('Something Went Wrong');
            this.Retailer.ContactPersonImage = null;
            return;
          }
        );
      }
    } else {
      if (!confirm("No Contact Person Image is selected. Proceed ?")) {
        return;
      }
      this.Retailer.ContactPersonImage = "";
    }


    this.Retailer.CreatedBy = 1;
    this.Retailer.RetailerId = this.id != null ? this.id : 0;
    this.retailerService.addeditRetailer(this.Retailer).subscribe(
      res => {
        console.log(this.Retailer)
        console.log(res.status);
        var status = res.status;
        if (status == 200) {
          if (this.Retailer.RetailerId != null)
            this.toaster.Success("Vendor Updated Successfully");
          else
            this.toaster.Success("Vendor Inserted Successfully");
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

  validateForm(){
    if (this.Retailer.Name == null || this.Retailer.Name == "") return true;
    if (this.Retailer.Phone == null || this.Retailer.Phone == "") return true;
    if (this.Retailer.Email == null || this.Retailer.Email == "") return true;
    if (this.Retailer.Address == null || this.Retailer.Address == "") return true;
   if (this.vFile!= undefined && this.messageV!="") return true;
   if (this.cpFile!= undefined && this.messageCP!="") return true;
  }
}

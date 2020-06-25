import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BannermasterService } from '../../services/Bannermaster/bannermaster.service';
import { Bannermaster } from '../../models/bannermaster';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-bannermaster',
  templateUrl: './bannermaster.component.html',
})
export class BannermasterComponent implements OnInit {

  Bannermaster = new Bannermaster(null,"","","",null,"",null,null);
  parentcategory: any;
  productdetails:any;
  id: any;
  response: any;
  dlFile: any;
  Category: boolean=false;
  Product: boolean=false;
  filename: any[];
  constructor(private bannermasterService: BannermasterService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
    }
showdiv(divshow){
  if(divshow == 'Category'){
    this.Category = true;
    this.Product = false;
  }if(divshow == 'Product'){
    this.Category = false;
    this.Product = true;
  }if(divshow == 'Combo'){
    this.Category = false;
    this.Product = false;
  }
}
  ngOnInit() {
    if(this.id){
      this.getBanner();
    }
    this.getParentategories();
    this.getProducts();
  }
  onSubmit() {
    !this.id ? this.addBanner() : this.editBanner();
  }
  getBanner(){
    this.bannermasterService.getBannerbyid(this.id).subscribe(data => {
      this.Bannermaster = data.data[0];
      if(this.Bannermaster.LinkFlag == "1"){
        this.Category =true;
        this.Product = false;
      }
      else if(this.Bannermaster.LinkFlag == "2"){
        this.Category =false;
        this.Product = true;
      }else{
        this.Category = false;
        this.Product = false;
      }
      console.log(this.Bannermaster);
    });
  }
  editBanner(){
    //alert('++++');
    this.filename = [];
    var i = 0;
    if(this.dlFile!= undefined){
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Bannermaster.BannerImage = file.name;
        
        this.Bannermaster.CreatedBy = 1;
        this.Bannermaster.IsFeatured = 1;
        this.Bannermaster.BannerId = this.id;
        this.bannermasterService.addeditBannermaster(this.Bannermaster).subscribe(
          res => {
            console.log(res.status);
            var status = res.status;
            if (status == 200) {
              this.bannermasterService.fileupload(uploadData).subscribe(
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
              this.toaster.Success("Banner Updated Successfully");
              this.router.navigate(["/bannermaster-list"]);
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
  }else{
    this.bannermasterService.addeditBannermaster(this.Bannermaster).subscribe(
      res => {
        console.log(res.status);
        var status = res.status;
        if (status == 200) {
          this.toaster.Success("Banner Updated Successfully");
          this.router.navigate(["/bannermaster-list"]);
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
  uploadFile(event: any) {
    this.dlFile = event.target.files;
    console.log(this.dlFile);

  }
  addBanner() {
    this.filename = [];
    var i = 0;
    // this.strDlFileName = "";
    if(this.dlFile!= undefined){
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        this.Bannermaster.BannerImage = file.name;

        this.Bannermaster.BannerId = 0;
        this.Bannermaster.IsFeatured = 1;
        this.Bannermaster.CreatedBy = 1;
        
        this.bannermasterService.addBanner(this.Bannermaster).subscribe(
          res => {
            console.log(res.status);
            var status = res.status;
            if (status == 200) {
              this.bannermasterService.fileupload(uploadData).subscribe(
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
              this.toaster.Success("Banner Added Successfully");
              this.router.navigate(["/bannermaster-list"]);
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
  }else{
        this.Bannermaster.BannerId = 0;
        this.Bannermaster.IsFeatured = 1;
        this.Bannermaster.CreatedBy = 1;
    this.bannermasterService.addeditBannermaster(this.Bannermaster).subscribe(
      res => {
        console.log(res.status);
        var status = res.status;
        if (status == 200) {
          this.toaster.Success("Banner Added Successfully");
          this.router.navigate(["/bannermaster-list"]);
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
  getParentategories(){
    this.bannermasterService.getParentategories().subscribe(data => {
      if(data){
        this.parentcategory = data.data[0];
      }

    });
  }

  getProducts() {
    const product = {
      'category': '',
      'name': '',
      'page': '1',
      'size': '10'
     };
    this.bannermasterService.getProducts(product).subscribe(data => {
      this.productdetails = data.data[0];
//console.log(this.data);
    });
  }

}

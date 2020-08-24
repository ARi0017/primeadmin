import { Component, OnInit, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { BannermasterService } from '../../services/Bannermaster/bannermaster.service';
import { Bannermaster } from '../../models/bannermaster';
import { ToasterService } from '../../services/toaster.service';
import { isNull } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-bannermaster',
  templateUrl: './bannermaster.component.html',
})
export class BannermasterComponent implements OnInit {

  Bannermaster = new Bannermaster(null,"","","",null,"",null, null)
  parentcategory: any;
  productdetails:any;
  id: any = 0;
  response: any;
  dlFile: any;
  Category: boolean=false;
  //Product: boolean=false;
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
    //this.Product = false;
  }if(divshow == 'Combo'){
    this.Category = false;
    //this.Product = false;
  }
}
  ngOnInit() {
    if(this.id){
      this.getBanner();
    }
    this.getParentategories();
    //this.getProducts();
  }
  getBanner(){
    this.bannermasterService.getBannerbyid(this.id).subscribe(data => {
      this.Bannermaster = data.data[0];
      if(this.Bannermaster.LinkFlag == "1"){
        this.Category =true;
        //this.Product = false;
      }
      else if(this.Bannermaster.LinkFlag == "2"){
        this.Category =false;
        //this.Product = true;
      }else{
        this.Category = false;
        //this.Product = false;
      }
      console.log(this.Bannermaster);
    });
  }
  getParentategories(){
    this.bannermasterService.getParentategories().subscribe(data => {
      if(data){
        this.parentcategory = data.data[0];
      }

    });
  }

  uploadFile(event: any) {
    this.dlFile = event.target.files;
    if (this.dlFile!=null){
      this.Bannermaster.BannerImage = this.dlFile[0].name;
    }
  }
  onSubmit() {
    if (this.dlFile!=null){
      for (let file of this.dlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.bannermasterService.fileupload(uploadData).subscribe(
            res => {
              var status = res.status;
              if (status == 200) {
                console.log('Banner Image uploaded');
                this.Bannermaster.BannerImage = file.name;
              }
            },
            err => {
              this.toaster.Error('Something Went Wrong');
              return;
            }
          );
        }
      }
    }
    this.Bannermaster.CreatedBy = 1;
    this.Bannermaster.BannerId = this.id != null ? this.id : 0;
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

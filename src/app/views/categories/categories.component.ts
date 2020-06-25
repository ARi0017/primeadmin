import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/Category/category.service';
import { Category } from '../../models/category';
import { ToasterService } from '../../services/toaster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
//@ViewChild('categoryForm',{ read: true, static: false }) public createcategoryform: NgForm;
  Category = new Category(null,"","","","",null,null,null);
  parentcategory: any;
  id: any;
  response: any;
  dlFile: any;
  filename: any[];

  constructor(private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
    }

  ngOnInit() {
    if(this.id){
      this.getCategory();
    }
    this.getParentategories();
  }
  onSubmit() {
    !this.id ? this.addCategory() : this.editCategory();
  }
  uploadFile(event: any) {
    this.dlFile = event.target.files;
    console.log(this.dlFile);

  }

addCategory(){
  this.filename = [];
    var i = 0;
    for (let file of this.dlFile) {
      const uploadData = new FormData();
      if (file != undefined) {
        uploadData.append("myFile", file, file.name);
        uploadData.append("name", "vridhi");
        this.Category.CoverImage = file.name;
        this.Category.CoverVideo = file.name;
        this.Category.CreatedBy = 1;
        this.Category.IsFeatured = 1;
        this.Category.IsSpecial = (this.Category.IsSpecial == 'false') ? "0" : "1";
        this.categoryService.addeditCategories(this.Category).subscribe(
          res => {
            console.log(res.status);
            var status = res.status;
            if (status == 200) {
              this.categoryService.fileupload(uploadData).subscribe(
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
              this.toaster.Success("Category Added Successfully");
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

getCategory(){
  this.categoryService.getCategorybyid(this.id).subscribe(data => {
    this.Category = data.data[0];
  });
}

editCategory(){
  this.filename = [];
    var i = 0;
    if(this.dlFile!= undefined){
      for (let file of this.dlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.Category.CoverImage = file.name;
          this.Category.CoverVideo = file.name;
          this.Category.CreatedBy = 1;
          this.Category.IsFeatured = 1;
          this.Category.CategoryId = this.id;
          this.Category.IsSpecial = (this.Category.IsSpecial == 'false') ? "0" : "1";
          this.categoryService.addeditCategories(this.Category).subscribe(
            res => {
              console.log(res.status);
              var status = res.status;
              if (status == 200) {
                this.categoryService.fileupload(uploadData).subscribe(
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
      this.Category.IsSpecial = (this.Category.IsSpecial == 'false') ? "0" : "1";
      this.categoryService.addeditCategories(this.Category).subscribe(
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

  getParentategories(){
    this.categoryService.getParentategories().subscribe(data => {
      if(data){
        this.parentcategory = data.data[0];
      }

    });
  }
}

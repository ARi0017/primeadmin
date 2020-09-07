import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/Category/category.service';
import { Category } from '../../models/category';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnInit {
//@ViewChild('categoryForm',{ read: true, static: false }) public createcategoryform: NgForm;
  Category = new Category("",null,null,null,"",null,null,'1',null,'1');
  parentcategory: any;
  id: any = 0;
  response: any;
  dlFile: any = null;
  vFile: any = null;

  constructor(private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private toaster: ToasterService) {
      this.route.paramMap.subscribe(res => {
        this.id = res.get("id");
      });
      console.log("CategoryId",this.id);
    }

  ngOnInit() {
    if(this.id){
      this.getCategory();
    }
    if (this.Category.IsEdit != '0'){
      this.getParentategories();
    }
  }

  uploadFile(event: any) {
    this.dlFile = event.target.files;
    console.log(this.dlFile);
  }

  uploadFile1(event: any) {
    this.vFile = event.target.files;
    console.log('vfile', this.vFile);
  }

  onSubmit() {
    if (this.dlFile != null){
      for (let file of this.dlFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
          this.Category.CoverImage = file.name;
          this.categoryService.fileupload(uploadData).subscribe(
            res => {
              var status = res.status;
              if (status == 200) {
                console.log('Cover Image uploaded. File name: ', this.Category.CoverImage);
              }
            },
            err => {
              this.toaster.Error('Something Went Wrong');
              this.Category.CoverImage = null;
              return;
            }
          );
        }
      }
    }
    if (this.vFile!=null){
      for (let file of this.vFile) {
        const uploadData = new FormData();
        if (file != undefined) {
          uploadData.append("myFile", file, file.name);
        }
        this.Category.CoverVideo = file.name;
        this.categoryService.fileupload(uploadData).subscribe(
          res => {
            var status = res.status;
            if (status == 200) {
              console.log('Cover Video uploaded. Video name: ', this.Category.CoverVideo);
            }
          },
          err => {
            this.toaster.Error('Something Went Wrong');
            this.Category.CoverVideo = null;
            return;
          }
        );
      }
    }
    this.Category.CreatedBy = 1;
    this.Category.IsFeatured = "1";
    this.Category.CategoryId = this.id != null ? this.id : 0;
    console.log(this.Category)
    this.categoryService.addeditCategories(this.Category).subscribe(
      res => {
        console.log(res.status);
        var status = res.status;
        if (status == 200) {
          if (this.id!= null)
            this.toaster.Success("Category Updated Successfully");
          else
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

getCategory(){
  this.categoryService.getCategorybyid(this.id).subscribe(data => {
    this.Category = data.data[0];
  });
}

  getParentategories(){
    this.categoryService.getParentategories().subscribe(data => {
      if(data){
        this.parentcategory = data.data[0];
        console.log("Sanjib",data.data[0]);
      }
    });
  }
}

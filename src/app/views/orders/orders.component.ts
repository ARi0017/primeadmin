import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import { CategoryService } from '../../services/Category/category.service';
import { Category } from '../../models/category';
import { ToasterService } from '../../services/toaster.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
})
export class OrdersComponent implements OnInit {
@ViewChild('categoryForm',{ read: true, static: false }) public createcategoryform: NgForm;
  //Category = new Category(null,"",null,null,"",null,null);
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
    this.getParentategories();
  }
  onSubmit() {
    //!this.id ? this.addCategory() : this.editCategory();
  }
  uploadFile(event: any) {
    this.dlFile = event.target.files;
    console.log(this.dlFile);

  }




  editCategory(){}
  getParentategories(){
    this.categoryService.getParentategories().subscribe(data => {
      if(data){
        this.parentcategory = data.data[0];
      }

    });
  }
}

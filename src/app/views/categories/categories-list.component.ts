import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { Router } from '@angular/router';
import { CategoryService } from '../../services/Category/category.service';
import { Category } from '../../models/category';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesListComponent implements OnInit {
  data: any;
  categoryname: any='';
  url: string;
  page: number = 1;
  count: number;
  CategoryId: any='';
  IsActive:any ='';
  PageSize:number=10;
  // dataCount: number;
  constructor(private categoryService: CategoryService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {    
    this.getCategories(this.page);
  }

  getCategories(page: number) {
    let Category = {categoryname: this.categoryname, page: page, Size: this.PageSize}
    this.categoryService.getCategories(Category).subscribe(data => {
      this.data = data.data[0];
      this.url = data.Imgurl;
      //this.dataCount = (this.data.length > 0) ? this.data[0].RowCount : 0;
      this.count = (Object.keys(this.data).length > 0) ? this.data[0].RowCount : 0;
      // this.count = (this.dataCount - (this.dataCount%this.PageSize))/this.PageSize + 1;
      console.log("Total Page Count",this.count);
    });
  }

  getPagination(page: number){
    this.page = page;
    this.getCategories(this.page);
  }

  addCategories() {
    this.router.navigate(['/categories-list/add']);
  }
  // Change Status
  onStatus(id: any, is_active: string) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.CategoryId = id;
    this.IsActive = is_active;
    const catstatus = {
      'CategoryId': this.CategoryId,
      'IsActive': this.IsActive,
      'CreatedBy': '1'
     };
    this.categoryService.statusChange(catstatus).subscribe(data => {
      this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Status Updated Successfully");
        this.getCategories(this.page);
      }
    });
  }




}

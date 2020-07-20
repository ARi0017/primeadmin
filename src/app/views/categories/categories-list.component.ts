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
  constructor(private categoryService: CategoryService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    let initialCategory = {categoryname: this.categoryname, page: this.page}
    this.getCategories(initialCategory);
    this.getCount();
  }

  search() {
    const category1 = {
      categoryname:this.categoryname,page : this.page
     };
    this.categoryService.getCategories(category1).subscribe(data => {
      this.data = data.data[0];
      this.url = data.Imgurl;
//console.log(data);
    });
  }

  getCategories(categoryInterface: {categoryname: string, page: number}) {
    const category =  categoryInterface;
    this.categoryService.getCategories(category).subscribe(data => {
      this.data = data.data[0];
      this.url = data.Imgurl;
//console.log(this.data);
    });
  }

  getPagination(page: number){
    this.page = page;
    this.getCategories({categoryname: this.categoryname, page: this.page});
  }

  getCount() {
    this.categoryService.getCount()
      .subscribe(res => {
        this.count = res.TotalCategoryCount;
      });
  }

  addCategories() {
    this.router.navigate(['/categories-list/add']);
  }

  onDelete(id: any) {
    if (!confirm("Are You Sure ?")) {
      return;
    }
    this.categoryService.deleteCategories(id).subscribe(data => {
      this.data = data.data[0];
      if (data.status == 200) {
        this.toaster.Success("Category Deleted Successfully");
      }
    });
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
        this.search();
      }
    });
  }




}

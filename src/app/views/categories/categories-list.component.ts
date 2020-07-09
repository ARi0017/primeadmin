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
  url: any;
  constructor(private categoryService: CategoryService,
    private router: Router,
    private toaster: ToasterService) {
  }

  ngOnInit() {
    this.getCategories();
  }

  search(name: string) {
    const category1 = {
      'category': name,
      'page': '1',
      'size': '10'
     };
    this.categoryService.getCategories(category1).subscribe(data => {
      this.data = data.data[0];
      this.url = data.Imgurl;
//console.log(data);
    });
  }

  getCategories() {
    const category = {
      'category': '',
      'page': '1',
      'size': '10'
     };
    this.categoryService.getCategories(category).subscribe(data => {
      this.data = data.data[0];
      this.url = data.Imgurl;
//console.log(this.data);
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

  }




}

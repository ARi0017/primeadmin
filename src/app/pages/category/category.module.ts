import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { AddEditCategoryComponent } from './add-edit-category/add-edit-category.component';



@NgModule({
  declarations: [CategoryComponent, AddEditCategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }

import { CategoriesComponent } from './../views/categories/categories.component';
import { CanDeactivate } from '@angular/router';
import { Injectable } from '@angular/core';
@Injectable()
export class CanDeactivateGuardService implements CanDeactivate<CategoriesComponent>{
  canDeactivate(component: CategoriesComponent): boolean {
  //  if(component.createcategoryform.dirty) {
  //    return confirm('Are you sure yor want to discard your changes');
  //  }
    return true;
   }


}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category, CategoryDropDown } from '../model/category.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = environment;

  constructor(private http: HttpClient) { }

  categoryList(pageIndex: number, pageSize: number, sort: string) {
    let _param: HttpParams = new HttpParams()
        .append("pageIndex", `${pageIndex}`)
        .append("pageSize", `${pageSize}`)
        .append("sort", `${sort}`);

    return this.http.get<{ data: Category[], count: number}>(
      `${this.baseUrl.serviceUrl}/categories`,
      {
        params: _param
      }
    );
  }


  //Get Category details by its id
  getCategoryById(id: string): Observable<{ data: Category, message: string}> {
    return this.http.get<{ data: Category, message: string}>(
      `${this.baseUrl.serviceUrl}/categories/${id}`
      );
  }
    
  addCategory(CategoryData : Category): Observable<{message: string}> {
    return this.http.post<{message: string}>(
        `${this.baseUrl.serviceUrl}/categories`, 
        CategoryData
      );
  }
  
    
  
  //Update Category list
  updateCategory(id: string, CategoryData : Category): Observable<{message: string}> {
    return this.http.put<{message: string}>(
      `${this.baseUrl.serviceUrl}/categories/${id}`,
      CategoryData
    );
  }

  categoryListForDropdown() {
    return this.http.get<{ data: CategoryDropDown[] }>(
      `${this.baseUrl.serviceUrl}/categories/dropdown`
    );
  }
  
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../model/category.model';
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
      `${this.baseUrl.serviceUrl}/categorys`,
      {
        params: _param
      }
    );

    
  }
}

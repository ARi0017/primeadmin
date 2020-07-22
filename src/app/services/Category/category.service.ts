import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Icategory {
  data: object;
  TotalCategoryCount: any;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getCategories(category: object): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url.ServiceUrl}/category`, category);
  }

  getCategorybyid(id: string): Observable<Icategory> {
    return this.http.get<Icategory>(`${this.url.ServiceUrl}/category/${id}`);
  }
  getParentategories(): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url.ServiceUrl}/parentcategorylist`, '');
  }
  addeditCategories(adddata: object): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url.ServiceUrl}/addeditcategory`, adddata);
  }
  deleteCategories(id: string): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url.ServiceUrl}/deletecategory`, id);
  }
   fileupload(adddata: object): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url.ServiceUrl}/uploadcategory`, adddata);
  }
  statusChange(catstatus : object): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url.ServiceUrl}/categorystatus`,catstatus);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Icategory {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getCategories(category: object): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url}/category`, category);
  }
  getCategorybyid(id: string): Observable<Icategory> {
    return this.http.get<Icategory>(`${this.url}/category/${id}`);
  }
  getParentategories(): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url}/parentcategorylist`, '');
  }
  addeditCategories(adddata: object): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url}/addeditcategory`, adddata);
  }
  deleteCategories(id: string): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url}/deletecategory`, id);
  }
   fileupload(adddata: object): Observable<Icategory> {
    return this.http.post<Icategory>(`${this.url}/uploadcategory`, adddata);
  }
}


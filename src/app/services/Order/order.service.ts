import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Iorder {
  data: object;
  status: number;
}
@Injectable({
  providedIn: 'root'
})
export class OrderService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getCategories(category: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url}/category`, category);
  }
  getOrders(): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url}/parentcategorylist`, '');
  }
  addCategories(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`${this.url}/addcategory`, adddata);
  }
   fileupload(adddata: object): Observable<Iorder> {
    return this.http.post<Iorder>(`http://localhost:3000/uploadcategory`, adddata);
  }
}


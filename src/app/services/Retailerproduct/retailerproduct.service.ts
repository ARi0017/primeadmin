import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Iretailer {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class RetailerproductService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getRetailer(category: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/retailerlist`, category);
  }
  getCategories(category: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/category`, category);
  }
  getProductbyretailerid(id: Object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/retailerproductlist`, id);
  }
  getProductList(product: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/products`, product);
  }
  getRetailerbyid(id: Object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/retailer`, id);
  }

  addeditRetailerproduct(adddata: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/retailerproductaddedit`, adddata);
  }
 
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Iretailer {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class RetailerproductService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getRetailer(category: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/retailerlist`, category);
  }
  getCategories(category: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/category`, category);
  }
  getProductbyretailerid(id: Object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/retailerproductlist`, id);
  }
  getProductList(product: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/products`, product);
  }
  getRetailerbyid(id: Object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/retailer`, id);
  }

  addeditRetailerproduct(adddata: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/retailerproductaddedit`, adddata);
  }
 
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Iproduct {
  TotalItemsCount: any;
  data: object;
  status: number;
  imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  
  constructor(private http: HttpClient, private url: UrlService) { }
  getDashDetail(): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/dashboardcount `, '');
  }
  getProductList(product: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/products`, product);
  }
  //fileupload(adddata: object): Observable<Iproduct> {
  //   return this.http.post<Iproduct>(`${this.url.ServiceUrl}/uploadbanner`, adddata);
  // }
  fileupload(myFile: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/uploadproductimg`, myFile);
  }
  videoupload(adddata: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/uploadproductvideo`, adddata);
  }
  // getProductDetailsById(productId: number): Observable<Iproduct> {
  //   return this.http.get<Iproduct>(`${this.url}product/getProductDetails?productId=${productId}`);
  // }
  getProductbyid(id: string): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.url.ServiceUrl}/products/${id}`);
  }
  getChildCategories(): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/categoryactivechildlist`, '');
  }
  addeditProduct(adddata: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/addeditproduct`, adddata);
  }
  getCount(categoryid: string, name: string): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/productcount`, {
      categoryid: categoryid,
      name: name
    });
  }
  deleteProduct(id: string): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/deleteproduct/${id}`,{});
  }
  statusChange(prostatus : object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/productstatus`,prostatus);
  }
  getTaxCategories(): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/taxselect`, '');
  }
  getRetailer(category: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url.ServiceUrl}/retailerlist`, category);
  }
}

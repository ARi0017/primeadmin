import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Iproduct {
  data: object;
  status: number;
}
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getProductList(product: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url}/products`, product);
  }
  fileupload(adddata: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url}/uploadbanner`, adddata);
  }
  videoupload(adddata: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url}/uploadproductvideo`, adddata);
  }
  // getProductDetailsById(productId: number): Observable<Iproduct> {
  //   return this.http.get<Iproduct>(`${this.url}product/getProductDetails?productId=${productId}`);
  // }
  getProductbyid(id: string): Observable<Iproduct> {
    return this.http.get<Iproduct>(`${this.url}/products/${id}`);
  }
  getParentategories(): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url}/parentcategorylist`, '');
  }
  addeditProduct(adddata: object): Observable<Iproduct> {
    return this.http.post<Iproduct>(`${this.url}/addeditproduct`, adddata);
  }

}

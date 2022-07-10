import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Product } from "../model/product.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = environment;

  constructor(private http: HttpClient) {}

  productList(pageIndex: number, pageSize: number, sort: string) {
    let params: HttpParams = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    return this.http.get<{ data: Product[]; count: number }>(
      `${this.baseUrl.serviceUrl}/products`,
      {
        params: params,
      }
    );
  }


  //Get Product details by its id
  getProductById(id: string): Observable<{ data: Product, message: string }> {
    return this.http.get<{ data: Product, message: string }>(
        `${this.baseUrl.serviceUrl}/products/${id}`
      );
  }

  //Add a new Product
  addProduct(productData: Product): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
        `${this.baseUrl.serviceUrl}/products`, 
        productData
      );
  }

  //Update Product list
  updateProduct(id: string, productData : Product): Observable<{ message: string }> {
    return this.http.put<{ message: string }>(
      `${this.baseUrl.serviceUrl}/products/${id}`,
       productData
    );
  }

  importProduct(formData: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl.serviceUrl}/products/uploadexcel`,
      formData
    );
  }
}

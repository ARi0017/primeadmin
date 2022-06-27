import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IProduct, Product } from "../model/product.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  baseUrl = environment;

  constructor(private http: HttpClient) {}

  productList(pageIndex: number, pageSize: number, sort: string) {
    let params = new HttpParams()
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

  //Add a new Product
  addProduct(productData : Product) {
    return this.http.post<IProduct>(`${this.baseUrl.serviceUrl}/products`, productData);
  }

  //Get Product details by its id
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl.serviceUrl}/products/${id}`);
  }

  //Update Product list
  updateProduct(id: string, productData : Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseUrl.serviceUrl}/products/${id}`,
       productData
    );
  }
}

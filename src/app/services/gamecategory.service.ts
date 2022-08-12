import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class GamecategoryService {
  baseUrl = environment;
  constructor(private http: HttpClient) { }

  //Get game category list
  categoryList() {
    return this.http.get<any>(
      `${this.baseUrl.serviceUrl}/categories`
    );
  }



}

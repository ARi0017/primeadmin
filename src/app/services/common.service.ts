import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IMenu } from "../model/common.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class CommonService {
  baseUrl = environment;
  constructor(private http: HttpClient) {}

  //Get all menu list
  getMenu() {
    return this.http.get<{ menu: IMenu[] }>(
      `${this.baseUrl.serviceUrl}/menu/`,
      {}
    );
  }
}

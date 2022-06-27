import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IMenu } from "../model/common.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class MenuService {
  baseUrl = environment;

  constructor(private http: HttpClient) {}

  //Get all menu list
  menuList(pageIndex: number, pageSize: number, sort: string) {
    let params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    return this.http.get<{ data: IMenu[]; count: number }>(
      `${this.baseUrl.serviceUrl}/menu`,
      {
        params,
      }
    );
  }

  //Add a new menu
  addMenu(addData: object) {
    return this.http.post<IMenu>(`${this.baseUrl.serviceUrl}/menu/`, addData);
  }

  //Get menu details by its id
  getMenuById(id: string): Observable<{ menu: IMenu}> {
    return this.http.get<{ menu: IMenu}>(`${this.baseUrl.serviceUrl}/menu/${id}`);
  }

  //Update menu list
  updateMenu(editData: object, id: string): Observable<{message : string}> {
    return this.http.put<{message : string}>(
      `${this.baseUrl.serviceUrl}/menu/${id}`,
      editData
    );
  }
}

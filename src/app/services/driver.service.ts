import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { IDriver, Driver } from "../model/driver.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl = environment;

  constructor(private http: HttpClient) {}

  //Get all menu list
  driverList(pageIndex: number, pageSize: number, sort: string) {
    let params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    return this.http.get<{ data: IDriver[]; count: number }>(
      `${this.baseUrl.serviceUrl}/drivers`,
      {
        params,
      }
    );
  }

  //Add a new menu
  addDriver(addData: object) {
    return this.http.post<IDriver>(`${this.baseUrl.serviceUrl}/drivers/register`, addData);
  }

  //Get menu details by its id
  getDriverById(id: string): Observable<{ menu: IDriver}> {
    return this.http.get<{ menu: IDriver}>(`${this.baseUrl.serviceUrl}/drivers/${id}`);
  }

  //Update menu list
  updateDriver(editData: object, id: string): Observable<{message : string}> {
    return this.http.put<{message : string}>(
      `${this.baseUrl.serviceUrl}/drivers/${id}`,
      editData
    );
  }
}

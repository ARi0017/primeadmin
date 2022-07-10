import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Driver } from "../model/driver.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DriverService {
  baseUrl = environment;

  constructor(private http: HttpClient) { }

  //Get all driver list
  driverList(pageIndex: number, pageSize: number, sort: string) {
    let _params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    return this.http.get<{ data: Driver[]; count: number }>(
      `${this.baseUrl.serviceUrl}/drivers`,
      {
        params: _params
      }
    );
  }

  //Add a new driver
  addDriver(addData: Driver) {
    return this.http.post<{message: string}>(`${this.baseUrl.serviceUrl}/drivers/register`, addData);
  }

  //Get driver details by its id
  getDriverById(id: string):  Observable<{ data: Driver, message: string}> {
    return this.http.get<{ data: Driver, message: string}>(`${this.baseUrl.serviceUrl}/drivers/${id}`);
  }

  //Update driver list
  updateDriver(id: string, editData: Driver): Observable<{message : string}> {
    return this.http.put<{message : string}>(
      `${this.baseUrl.serviceUrl}/drivers/${id}`,
      editData
    );
  }

  importDriver(formData: FormData): Observable<{ message: string }> {
    return this.http.post<{ message: string }>(
      `${this.baseUrl.serviceUrl}/drivers/uploadexcel`,
      formData
    )
  }
}

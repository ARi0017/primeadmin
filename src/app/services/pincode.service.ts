import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Pincode } from "../model/pincode.model";
import { NzUploadFile } from "ng-zorro-antd";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PincodeService {
  baseUrl = environment;

  constructor(private http: HttpClient) {}

  //Get all menu list
  pincodeList(pageIndex: number, pageSize: number, sort: string) {
    let params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    return this.http.get<{ data: Pincode[]; count: number }>(
      `${this.baseUrl.serviceUrl}/pincodes`,
      {
        params,
      }
    );
  }

  //Add a new menu
  addPincode(addData: Pincode) {
    return this.http.post<{message: string}>(`${this.baseUrl.serviceUrl}/pincodes`, addData);
  }

  //Get menu details by its id
  getPincodeById(id: string): Observable<{ data: Pincode, message: string}> {
    return this.http.get<{ data: Pincode, message: string}>(`${this.baseUrl.serviceUrl}/pincodes/${id}`);
  }

  //Update menu list
  updatePincodeStatus(editData: Pincode, id: string): Observable<{message : string}> {
    return this.http.put<{message: string}>(
      `${this.baseUrl.serviceUrl}/pincodes/update-status/${id}`,
      editData
    );
  }

  //Update menu list
  updatePincode(id: string, editData: Pincode): Observable<{message : string}> {
    return this.http.put<{message: string}>(
      `${this.baseUrl.serviceUrl}/pincodes/${id}`,
      editData
    );
  }



  importPincode(formData: FormData) {
    return this.http.post<{ message: string }>(
      `${this.baseUrl.serviceUrl}/pincodes/uploadexcel`,
      formData
    );
  }
}
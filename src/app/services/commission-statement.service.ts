import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { ICommission } from './../model/common.model';
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommissionStatementService {
  baseUrl = environment;

   constructor(private http: HttpClient) { }

   //Get all Commission list
  commissionList(pageIndex: number, pageSize: number, sort: string,startDate:string,endDate:string) {
    let params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`)
      .append("startDate", `${startDate}`)
      .append("endDate", `${endDate}`);
    return this.http.get<{ commissionList: ICommission[]; count: number }>(
      `${this.baseUrl.serviceUrl}/reports/commission`,
      { params }
    );
  }
}

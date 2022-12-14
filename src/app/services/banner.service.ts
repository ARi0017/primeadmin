import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Banner } from "../model/banner.model";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BannerService {
  baseUrl = environment;

  constructor(private http: HttpClient) {

  }

  bannerList(pageIndex: number, pageSize: number, sort: string) {
    let params = new HttpParams()
      .append("pageIndex", `${pageIndex}`)
      .append("pageSize", `${pageSize}`)
      .append("sort", `${sort}`);
    return this.http.get<{ data: Banner[]; count: number }>(
      `${this.baseUrl.serviceUrl}/banners`,
      {
        params,
      }
    );
  }

  addBanner(bannerData : Banner): Observable<{message: string}> {
    return this.http.post<{message: string}>(`${this.baseUrl.serviceUrl}/banners`, bannerData);
  }

  //Get Banner details by its id
  getBannerById(id: string): Observable<{ data: Banner, message: string}> {
    //alert(id);
    return this.http.get<{ data: Banner, message: string}>(
      `${this.baseUrl.serviceUrl}/banners/${id}`
      );
  }

  //Update Banner list
  updateBanner(id: string, bannerData : Banner): Observable<{message: string}> {
    return this.http.put<{message: string}>(
      `${this.baseUrl.serviceUrl}/banners/${id}`,
      bannerData
    );
  }



}

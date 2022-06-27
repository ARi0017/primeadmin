import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Banner, IBanner } from "../model/banner.model";
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
    return this.http.get<{ data: IBanner[]; count: number }>(
      `${this.baseUrl.serviceUrl}/banners`,
      {
        params,
      }
    );
  }

  addBanner(bannerData : Banner) {
    return this.http.post<Banner>(`${this.baseUrl.serviceUrl}/banners`, bannerData);
  }

  //Get Banner details by its id
  getBannerById(id: string): Observable<Banner> {
    return this.http.get<Banner>(`${this.baseUrl.serviceUrl}/Banners/${id}`);
  }

  //Update Banner list
  updateBanner(id: string, bannerData : Banner): Observable<Banner> {
    return this.http.put<Banner>(
      `${this.baseUrl.serviceUrl}/Banners/${id}`,
      bannerData
    );
  }


  uploadCsv(uploadedFile: FormData) {
    return this.http.post<{ message: string }>(
      `${this.baseUrl.serviceUrl}/players/uploadcsv`,
      uploadedFile
    );
  }
}

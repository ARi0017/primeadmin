import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Ibannermaster {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class BannermasterService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getBanners(banner: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/bannerlist`, banner);
  }
  addBanner(adddata: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/addeditbanner`, adddata);
  }
  getParentategories(): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/parentcategorylist`, '');
  }
  getProducts(product: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/products`, product);
  }
  fileupload(adddata: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/uploadbanner`, adddata);
  }
  addeditBannermaster(adddata: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/addeditbanner`, adddata);
  }
  // deleteBanner(id: string): Observable<Ibannermaster> {
  //   return this.http.post<Ibannermaster>(`${this.url}/deletebanner`, id);
  // }
  deleteBanner(id: string): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/deletebanner/${id}`,{});
  }
  getBannerbyid(id: string): Observable<Ibannermaster> {
    return this.http.get<Ibannermaster>(`${this.url.ServiceUrl}/banner/${id}`);
  }
  statusChange(banstatus : object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url.ServiceUrl}/bannerstatus`,banstatus);
  }
}


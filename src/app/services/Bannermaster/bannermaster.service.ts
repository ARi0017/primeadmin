import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Ibannermaster {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class BannermasterService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getBanners(banner: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url}/bannerlist`, banner);
  }
  addBanner(adddata: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url}/addeditbanner`, adddata);
  }
  getParentategories(): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url}/parentcategorylist`, '');
  }
  getProducts(product: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url}/products`, product);
  }
  fileupload(adddata: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url}/uploadbanner`, adddata);
  }
  addeditBannermaster(adddata: object): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url}/addeditbanner`, adddata);
  }
  // deleteBanner(id: string): Observable<Ibannermaster> {
  //   return this.http.post<Ibannermaster>(`${this.url}/deletebanner`, id);
  // }
  deleteBanner(id: string): Observable<Ibannermaster> {
    return this.http.post<Ibannermaster>(`${this.url}/deletebanner/${id}`,{});
  }
  getBannerbyid(id: string): Observable<Ibannermaster> {
    return this.http.get<Ibannermaster>(`${this.url}/banner/${id}`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Iretailer {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class RetailerService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getRetailer(category: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/retailerlist`, category);
  }
  getRetailerbyid(id: Object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/retailer`, id);
  }


  addeditRetailer(adddata: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/retaileraddedit`, adddata);
  }
  deleteRetailer(id: string): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/deleteretailer/${id}`, {});
  }
   fileupload(adddata: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url.ServiceUrl}/uploadretailer`, adddata);
  }
}


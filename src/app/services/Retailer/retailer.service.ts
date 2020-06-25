import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Iretailer {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class RetailerService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getRetailer(category: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/retailerlist`, category);
  }
  getRetailerbyid(id: Object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/retailer`, id);
  }


  addeditRetailer(adddata: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/retaileraddedit`, adddata);
  }
  deleteRetailer(id: string): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/deleteretailer/${id}`, {});
  }
   fileupload(adddata: object): Observable<Iretailer> {
    return this.http.post<Iretailer>(`${this.url}/uploadretailer`, adddata);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
interface Idriver {
  data: object;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class DriverService {
  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

  getDriver(driver: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url}/driver`, driver);
  }
  getDriverbyid(id: string): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url}/driverselectrow/${id}`, {});
  }

  addeditDriver(adddata: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url}/driveraddedit`, adddata);
  }
  deleteDriver(id: string): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url}/deletedriver/${id}`, {});
  }
   fileupload(adddata: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url}/uploaddriverimage`, adddata);
  }
}


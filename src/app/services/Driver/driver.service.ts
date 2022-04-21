import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {UrlService} from '../Url/url.service';
interface Idriver {
  data: object;
  TotalDriverCount: any;
  status: number;
  Imgurl: string;
}
@Injectable({
  providedIn: 'root'
})
export class DriverService {

  constructor(private http: HttpClient, private url: UrlService) { }
  GetDriverPendingOrder(driver: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/driverpendingorder`, driver);
  }
  GetDriverCompleteOrder(driver: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/drivercompletedorder`, driver);
  }
  getDriver(driver: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/driver`, driver);
  }
  getDriverbyid(id: string): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/driverselectrow/${id}`, {});
  }

  addeditDriver(adddata: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/driveraddedit`, adddata);
  }
  deleteDriver(id: string): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/deletedriver/${id}`, {});
  }
   fileupload(adddata: object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/uploaddriverimage`, adddata);
  }

  driverLicenceFileUpload(driverLicenseUploadData: Object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/uploaddriverlicenseimage`, driverLicenseUploadData);
  }

  getCount(): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/drivercount`, '');
  }

  statusChange(driverstatus : object): Observable<Idriver> {
    return this.http.post<Idriver>(`${this.url.ServiceUrl}/driverstatus`,driverstatus);
  }
}


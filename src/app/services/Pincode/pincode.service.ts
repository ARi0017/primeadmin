import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../Url/url.service';
import { Observable } from 'rxjs';

interface IPincode {
  data: object,
  totalPincodeCount: any,
  status: any
}

@Injectable({
  providedIn: 'root'
})
export class PincodeService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getPincode(pincode: object): Observable<IPincode> {
    return this.http.post<IPincode>(`${this.url.ServiceUrl}/pincodesearchlist`,pincode)
  }

  getPincodeById(id: object): Observable<IPincode> {
    return this.http.post<IPincode>(`${this.url.ServiceUrl}/pincodelistbyid`, id);
  }

  addedItPincode(addData: object): Observable<IPincode> {
    return this.http.post<IPincode>(`${this.url.ServiceUrl}/addeditpincode`, addData);
  }

  pincodeStatusChange(pincodeStatus : object): Observable<IPincode> {
    return this.http.post<IPincode>(`${this.url.ServiceUrl}/pincodestatusupdate`,pincodeStatus);
  }
}

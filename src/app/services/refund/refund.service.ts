import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../Url/url.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class RefundService {

  constructor(
    private http:HttpClient,
    private Url:UrlService
  ) { }

  getRefundList():Observable<any>{
   return this.http.get<any>(`${this.Url.ServiceUrl}/orderrefundlist`);
  }

  updateStatus(id:string){
    let data={"refundrequestid":id}
    return this.http.post<any>(`${this.Url.ServiceUrl}/orderrefundaccepted`,data);
  }
}

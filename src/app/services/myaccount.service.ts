import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MyaccountService {
  baseUrl = environment;
  constructor(private http: HttpClient) {}

 //Get current Agent details
 agentDetail(){
  return this.http.get<any>(
    `${this.baseUrl.serviceUrl}/users/details`
  );
}
  
}

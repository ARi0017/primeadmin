import { HttpClient, HttpHeaders,HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: 'root'
})
export class UserBankingService {
  baseUrl = environment;
  headerData=new HttpHeaders().set(
    "Authorization",
     `Bearer ${localStorage.getItem("token")}`
  );
  constructor(private http: HttpClient) { }

  AllUsertransactionlist(startDate:string,endDate:string){
    let header = new HttpHeaders().set(
      "Authorization",
       `Bearer ${localStorage.getItem("token")}`
    );
    let params = new HttpParams()
    .append("startDate", `${startDate}`)
    .append("endDate", `${endDate}`);
    return this.http.get<any>(`${environment.serviceUrl}/usertransactions`,{headers:header,params:params});
  }
  UserPendingtransactionlist(startDate:string,endDate:string){
    let header = new HttpHeaders().set(
      "Authorization",
       `Bearer ${localStorage.getItem("token")}`
    );
    let params = new HttpParams()
    .append("startDate", `${startDate}`)
    .append("endDate", `${endDate}`);
    return this.http.get<any>(`${environment.serviceUrl}/usertransactions/pending`,{headers:header,params:params});
  }

  updateUserTransactionStatus(id:any){
    let data={isApproved:1}
    return this.http.put<any>(`${environment.serviceUrl}/usertransactions/transaction-status/62eb82f83709a70774292168${id}`,data,{headers:this.headerData})
  }

  addRequest(data:any){
    return this.http.post<any>(`${environment.serviceUrl}/usertransactions/transaction-request`,data,{headers:this.headerData})
  }




}

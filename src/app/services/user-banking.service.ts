import { HttpClient, HttpHeaders } from "@angular/common/http";
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

  AllUsertransactionlist(){
    let header = new HttpHeaders().set(
      "Authorization",
       `Bearer ${localStorage.getItem("token")}`
    );
    return this.http.get<any>(`${environment.serviceUrl}/usertransactions?pageIndex=1&pageSize=10&sort=-_id&startDate=&endDate=`,{headers:header});
  }
  UserPendingtransactionlist(){
    let header = new HttpHeaders().set(
      "Authorization",
       `Bearer ${localStorage.getItem("token")}`
    );
    return this.http.get<any>(`${environment.serviceUrl}/usertransactions/pending`,{headers:header});
  }

  updateUserTransactionStatus(id:any){
    let data={isApproved:1}
    return this.http.put<any>(`${environment.serviceUrl}/usertransactions/transaction-status/62eb82f83709a70774292168${id}`,data,{headers:this.headerData})
  }

  addRequest(data:any){
    return this.http.post<any>(`${environment.serviceUrl}/usertransactions/transaction-request`,data,{headers:this.headerData})
  }




}

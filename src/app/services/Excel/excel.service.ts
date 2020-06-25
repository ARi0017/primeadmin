import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
interface Iproduct {
  data: object;
  status: number;
}
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  url = localStorage.getItem('ServerUrl');
  constructor(private http: HttpClient) { }

 excelImport(providrdata): Observable<any> {
  //  return this.http.post(`${this.url}/import`, JSON.stringify(providrdata)).pipe(map((res) => res));
    return this.http.post(`${this.url}/import`, JSON.stringify(providrdata));
}


}

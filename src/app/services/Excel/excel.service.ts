import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs-compat/operator/map';
import {UrlService} from '../Url/url.service';
interface Iproduct {
  data: object;
  status: number;
}
@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor(private http: HttpClient, private url: UrlService) { }

 excelImport(providrdata): Observable<any> {
  //  return this.http.post(`${this.url}/import`, JSON.stringify(providrdata)).pipe(map((res) => res));
    return this.http.post(`${this.url.ServiceUrl}/import`, JSON.stringify(providrdata));
}


}

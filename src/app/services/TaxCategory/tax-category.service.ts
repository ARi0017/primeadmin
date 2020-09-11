import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../Url/url.service';
import { Observable } from 'rxjs';

interface ITax{
  count: number;
  data: Array<object>;
  status: number;

}
@Injectable({
  providedIn: 'root'
})
export class TaxCategoryService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getTaxCategories(): Observable<ITax> {
    return this.http.post<ITax>(`${this.url.ServiceUrl}/taxall`, '');
  }
  taxCategoryStatus(taxStatus: object): Observable<ITax> {
    return this.http.post<ITax>(`${this.url.ServiceUrl}/taxstatusupdate`, taxStatus);
  }

  addEditTaxCategory(addEditData: object): Observable<ITax> {
    return this.http.post<ITax>(`${this.url.ServiceUrl}/taxaddedit`, addEditData);
  }
}

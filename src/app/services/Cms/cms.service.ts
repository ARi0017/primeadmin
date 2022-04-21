import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../Url/url.service';
import { Observable, Observer } from 'rxjs';
import { Icu } from '@angular/compiler/src/i18n/i18n_ast';

interface ICms {
  data: object,
  totalDataCount: any,
  status: any
}

@Injectable({
  providedIn: 'root'
})
export class CmsService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getCms(): Observable<ICms> {
    return this.http.post<ICms>(`${this.url.ServiceUrl}/cmslisting`, null);
  }

  getCmsById(id: object): Observable<ICms> {
    return this.http.post<ICms>(`${this.url.ServiceUrl}/cmsbyid`, id);
  }

  updateCms(editData: object): Observable<ICms> {
    return this.http.post<ICms>(`${this.url.ServiceUrl}/cmsupdate`, editData);
  }

  updateImage(imgUrl: object): Observable<ICms> {
    return this.http.post<ICms>(`${this.url.ServiceUrl}/cmsimageupload`, imgUrl)
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { UrlService } from '../Url/url.service';
import { Observable } from 'rxjs';

interface IMisc {
  data: object,
  totalMiscCount: any,
  status: any
}

@Injectable({
  providedIn: 'root'
})
export class MiscellaneousService {

  constructor(private http: HttpClient, private url: UrlService) { }

  getMisc(): Observable<IMisc> {
    return this.http.post<IMisc>(`${this.url.ServiceUrl}/mischargelisting`, null)
  }

  editMisc(misc: object): Observable<IMisc> {
    return this.http.post<IMisc>(`${this.url.ServiceUrl}/mischargesettingupdate`, misc);
  }


}

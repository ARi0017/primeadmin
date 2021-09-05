import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UrlService {
public ServiceUrl = 'https://api.onlyalibaba.in/webservice';
//public ServiceUrl = 'http://localhost:3100/webservice';
  constructor() { }
}

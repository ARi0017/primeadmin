import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../Url/url.service';
import { Observable } from 'rxjs';
import { ObserveOnMessage } from 'rxjs/internal/operators/observeOn';

interface IVehicle {
  data: object;
  totalVehicleCount: any;
  status: number;
  VehiclaImage: string;
}
@Injectable({
  providedIn: 'root'
})
export class VehicleService {
  constructor(private http: HttpClient, private url: UrlService) { }

  getVehicleList(): Observable<IVehicle> {
    return this.http.post<IVehicle>(`${this.url.ServiceUrl}/vehiclelistall`, null);
  }

  activeVehiclesList(): Observable<IVehicle> {
    return this.http.post<IVehicle>(`${this.url.ServiceUrl}/vehiclelistactive`, null)
  }

  vehicleSearchById(vehicleId: object): Observable<IVehicle> {
    return this.http.post<IVehicle>(`${this.url.ServiceUrl}/vehicleselectbyrow`, vehicleId);
  }

  vehicleStatusUpdate(vehicleStatus: object): Observable<IVehicle> {
    return this.http.post<IVehicle>(`${this.url.ServiceUrl}/vechiclestatusupdate`, vehicleStatus)
  }

  vehicleImageUpload(imageFile: object): Observable<IVehicle> {
    return this.http.post<IVehicle>(`${this.url.ServiceUrl}/uploadvehicleimage`, imageFile)
  }

  addEditVehicle(addEditData: object): Observable<IVehicle> {
    return this.http.post<IVehicle>(`${this.url.ServiceUrl}/vechicleinsertupdate`, addEditData)
  }


}

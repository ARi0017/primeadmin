import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Zone, ZoneDropdown } from "../model/zone.model";
import { Observable } from "rxjs";
import { DistrictService } from "./district.service";


@Injectable({
  providedIn: 'root'
})
export class ZoneService {
  private baseUrl = environment;

  constructor(
    private http: HttpClient,
    private districts: DistrictService
    ) { }

  zoneList(pageIndex: number, pageSize: number, sort: string) {
    let _params: HttpParams = new HttpParams()
      .append("pageIndex",`${pageIndex}`)
      .append("pageSize",`${pageSize}`)
      .append("sort",`${sort}`);

    return this.http.get<{ data: Zone[], count: number, message: string}>(
      `${this.baseUrl.serviceUrl}/zones`,
      {
        params: _params
      }
    );
  }

  getZoneById(id: string): Observable<{ data: Zone, message: string}> {
    return this.http.get<{ data: Zone, message: string}>(
      `${this.baseUrl.serviceUrl}/zones/${id}`
    );
  }

  addZone(addData: Zone): Observable<{ message: string}> {
    return this.http.post<{ message: string}>(
      `${this.baseUrl.serviceUrl}/zones`,
      addData
    );
  }

  updateZone(id: string, editData: Zone): Observable<{ message: string}> {
    return this.http.put<{ message: string}>(
      `${this.baseUrl.serviceUrl}/zones/${id}`,
      editData
    );
  }

  getWbDistricts(): string[] {
    return this.districts.getWbDistricts();
  }

  zoneListForDropdown() {
    return this.http.get<{ data: ZoneDropdown[] }>(
      `${this.baseUrl.serviceUrl}/zones/dropdown`
    );
  }
}
